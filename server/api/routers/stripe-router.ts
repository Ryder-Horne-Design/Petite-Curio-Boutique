import Stripe from "stripe";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { XMLParser } from "fast-xml-parser";
import z from "zod";
import { byIso } from "country-code-lookup";

const stripe = new Stripe(process.env.STRIPE_KEY!);
export const stripeRouter = createTRPCRouter({
  getProducts: publicProcedure.query(async function() {
    let startAfter = "";
    const allProducts: Stripe.Product[] = [];
    while (true) {
      try {
        const products = await stripe.products.list({
          limit: 100,
          starting_after: startAfter.length > 0 ? startAfter : undefined,
        });
        allProducts.push(...products.data);
        if (products.has_more) {
          startAfter = products.data[products.data.length - 1].id;
        } else {
          break;
        };
      } catch(err) {
        console.error(err);
        break;
      };
    };
    return allProducts;
  }),
  getProductInformation: publicProcedure.input(z.object({
    productId: z.string(),
  })).query(async function({ input: { productId } }) {
    const product = await stripe.products.retrieve(productId);
    return product;
  }),
  getPriceInformation: publicProcedure.input(z.object({
    priceId: z.string(),
  })).query(async function({ input: { priceId } }) {
    const price = await stripe.prices.retrieve(priceId);
    return price;
  }),
  createCheckoutSession: publicProcedure.input(z.object({
    items: z.array(z.object({
      price: z.string().startsWith("price_"),
      quantity: z.number().int().positive(),
    })),
    country: z.string().regex(/us|ca|mx/),
    zip: z.string().min(5).max(6),
    measurements: z.array(z.object({
      pounds: z.number().int().positive(),
      ounces: z.number().int().positive(),
      width: z.number().positive(),
      length: z.number().positive(),
      height: z.number().positive(),
      value: z.number().positive(),
    })),
    name: z.string().min(5),
    city: z.string(),
    al1: z.string(),
    al2: z.string().optional(),
    state: z.string(),
    total: z.number().positive(),
  })).query(async function({ input: { items, country, zip, measurements, name, city, al1, al2, state, total } }): Promise<{
    success: boolean,
    url?: string,
    error?: unknown,
  }> {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
      parseAttributeValue: true,
    });
    let shippingPrice = 0;
    let minimum = country === "us" ? 3 : Infinity;
    let maximum = country === "us" ? 5 : 0;
    let amountRated = 0;
    let itemsAdded = 0;
    let xml = `<${country === "us" ? "RateV4Request" : "IntlRateV2Request"} USERID="${process.env.SHIPPING_USER}"><Revision>2</Revision>`;
    const url = `https://production.shippingapis.com/ShippingAPI.dll?API=${country === "us" ? "RateV4" : "IntlRateV2"}&XML=`;
    if (total < 75) {
      for (const i in items) {
        const productData = measurements[i];
        itemsAdded += 1;
        xml += `<Package ID=\"1ST\">${country === "us" ? "<Service>ALL</Service>" : ""}${country === "us" ? `<ZipOrigination>85204</ZipOrigination><ZipDestination>${zip}</ZipDestination>` : ""}<Pounds>${productData.pounds}</Pounds><Ounces>${productData.ounces}</Ounces>${country === "us" ? "<Container>VARIABLE</Container>" : ""}${country === "us" ? "" : `<MailType>Package</MailType><ValueOfContents>${productData.value}</ValueOfContents>`}${country === "us" ? "" : "<Country>" + byIso(country)!.country + "</Country>"}${country === "us" ? "" : "<Container>RECTANGULAR</Container>"}<Width>${productData.width}</Width><Length>${productData.length}</Length><Height>${productData.height}</Height>${country === "us" ? `<Value>${productData.value}</Value><Machinable>False</Machinable>` : `<OriginZip>85204</OriginZip><AcceptanceDateTime>${new Date(Date.now()).toISOString().replace("Z", "")}-07:00</AcceptanceDateTime><DestinationPostalCode>${zip}</DestinationPostalCode>`}</Package>`
        if (itemsAdded >= (25 * amountRated + 1) || itemsAdded >= items.length) {
          xml += `</${country === "us" ? "RateV4Request" : "IntlRateV2Request"}>`;
          const trueUrl = url + encodeURIComponent(xml);
          const fetchRes = await fetch(trueUrl);
          if (fetchRes.ok) {
            const data = parser.parse(await fetchRes.text());
            const rates = data[country === "us" ? "RateV4Response" : "IntlRateV2Response"];
            for (const packageItem of Object.keys(rates)) {
              const packageData = rates[packageItem];
              let price: number | undefined;
              if (country === "us") {
                for (const rate of packageData.Postage) {
                  if (rate.CLASSID === 1) {
                    price = rate.Rate;
                    break;
                  };
                };
                if (!price) {
                  console.warn("Could not find priority mail price. Finding cheapest mailing price.");
                  for (const rate of packageData.Postage) {
                    if (!price || rate.Rate < price) {
                      price = rate.Rate; 
                    };
                  };
                };
              } else {
                for (const rate of packageData.Service) {
                  if (rate.ID === 2) {
                    price = rate.Postage;
                    const minMax = rate.SvcCommitments.replace(" business days to many major markets").split("-");
                    const min = minMax[0];
                    const max = minMax[1];
                    if (min < minimum) {
                      minimum = min;
                    };
                    if (max > maximum) {
                      maximum = max;
                    };
                    break;
                  };
                };
                if (!price) {
                  console.warn("Could not find priority mail price. Finding cheapest mailing price.");
                  for (const rate of packageData.Service) {
                    if (!price || rate.Postage < price) {
                      price = rate.Postage;
                      const minMax = rate.SvcCommitments.replace(" business days to many major markets").split("-");
                      const min = minMax[0];
                      const max = minMax[1];
                      if (min < minimum) {
                        minimum = min;
                      };
                      if (max > maximum) {
                        maximum = max;
                      };  
                    };
                  };
                };
              };
              shippingPrice += price || 0;
            };
            amountRated += 1;
          } else {
            console.warn("Failed response. Error: " + fetchRes.statusText);
            return {
              success: false,
              error: "Failed response. Error: " + fetchRes.statusText,
            };
          };
        };
      };
    };

    const methods: Stripe.Checkout.SessionCreateParams.PaymentMethodType[] = [
      "card",
      "afterpay_clearpay",
      "klarna",
    ];
    if (total >= 50) {
      methods.push("affirm");
    };

    try {
      const session = await stripe.checkout.sessions.create({
        payment_intent_data: {
          shipping: {
            address: {
              city,
              country,
              line1: al1,
              line2: al2,
              postal_code: zip,
              state,
            },
            name,  
          },
        },
        payment_method_types: methods,
        line_items: items,
        mode: "payment",
        shipping_options: [
          {
            shipping_rate_data: {
              display_name: "Standard Shipping",
              type: "fixed_amount",
              fixed_amount: {
                amount: parseInt((shippingPrice * 100).toString()),
                currency: "usd",
              },
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: minimum,
                },
                maximum: {
                  unit: "business_day",
                  value: maximum,
                },
              },
            },
          },
        ],
        success_url: "https://www.petitecurioboutique.com",
      });
      return {
        success: true,
        url: session.url!,
      };
    } catch(err) {
      console.warn(err);
      return {
        success: false,
        error: err,
      };
    };
  }),
});