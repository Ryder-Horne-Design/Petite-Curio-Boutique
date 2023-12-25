import { type NextRequest } from "next/server";
import Stripe from "stripe";
import { XMLParser } from "fast-xml-parser";
import { byIso } from "country-code-lookup";

export const runtime = "edge";
export async function POST(Request: NextRequest) {
  const Body = await Request.json();
  if (Body && Body.Shipping && Body.Shipping.Name && Body.Shipping.Line1 && Body.Shipping.Postal && Body.Shipping.Country && byIso(Body.Shipping.Country) && Body.Shipping.Line2 && Body.Shipping.City && Body.Shipping.State && Body.Products && Body.Data) {
    const StripeAPI = new Stripe(process.env.STRIPE_KEY!);
    const Parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
      parseAttributeValue: true,
    });
    let ShippingPrice = 0;
    let Minimum = Infinity;
    let Maximum = 0;
    let AmountRated = 0;
    let XML = `<${Body.Shipping.Country === "US" ? "RateV4Request" : "IntlRateV2Request"}%20USERID="${process.env.SHIPPING_USER}"><Revision>2</Revision>`;
    const ItemsData = [];
    for (const Key of Object.keys(Body.Data)) {
      const ItemData = Body.Data[Key];
      XML += `<Package ID=\"1ST\">${Body.Shipping.Country === "US" ? "<Service>ALL</Service>" : ""}${Body.Shipping.Country === "US" ? `<ZipOrigination>85204</ZipOrigination><ZipDestination>${Body.Shipping.Postal}</ZipDestination>` : ""}<Pounds>${ItemData.Pounds}</Pounds><Ounces>${ItemData.Ounces}</Ounces>${Body.Shipping.Country === "US" ? "<Container>VARIABLE</Container>" : ""}${Body.Shipping.Country === "US" ? "" : `<MailType>Package</MailType><ValueOfContents>${ItemData.Value}</ValueOfContents>`}${Body.Shipping.Country === "US" ? "" : `<Country>${byIso(Body.Shipping.Country)!.country}</Country>`}${Body.Shipping.Country === "US" ? "" : "<Container>RECTANGULAR</Container>"}<Width>${ItemData.Width}</Width><Length>${ItemData.Length}</Length><Height>${ItemData.Height}</Height>${Body.Shipping.Country === "US" ? `<Value>${ItemData.Value}</Value><Machinable>False</Machinable>` : `<OriginZip>85204</OriginZip><AcceptanceDateTime>${new Date(Date.now()).toISOString().replace("Z", "")}-07:00</AcceptanceDateTime><DestinationPostalCode>${Body.Shipping.Postal}</DestinationPostalCode>`}</Package>`
      ItemsData.push(ItemData);
      if (ItemsData.length >= 25 || ItemsData.length + (AmountRated * 25) >= Object.keys(Body.Data).length) {
        XML += `</${Body.Shipping.Country === "US" ? "RateV4Request" : "IntlRateV2Request"}>`;
        while (true) {
          const XMLResponse = await fetch(Body.Shipping.Country === "US" ? `https://production.shippingapis.com/ShippingAPI.dll?API=RateV4&XML=${XML}` : `https://production.shippingapis.com/ShippingAPI.dll?API=IntlRateV2&XML=${XML}`).catch(Err => {console.warn(Err)});
          if (XMLResponse && XMLResponse.ok) {
            const PackageRates = Parser.parse(await XMLResponse.text());
            for (const Package of Object.keys(PackageRates[Body.Shipping.Country === "US" ? "RateV4Request" : "IntlRateV2Response"])) {
              const PackageData = PackageRates[Body.Shipping.Country === "US" ? "RateV4Request" : "IntlRateV2Response"][Package];
              if (Body.Shipping.Country === "US") {
                
              };
            };
            ItemsData.length = 0;
            AmountRated += 1;
            break;
          } else {
            console.warn("Failed response. Error: " + XMLResponse);
            return new Response("", {
              status: 500,
              statusText: "Internal Server Error",
            });
          };
        };
      };
    };

    const Customer = await StripeAPI.customers.create({
      name: Body.Shipping.Name,
      shipping: {
        address: {
          city: Body.Shipping.Country === "US" ? Body.Shipping.City : null,
          country: Body.Shipping.Country,
          line1: Body.Shipping.Line1,
          line2: Body.Shipping.Line2,
          postal_code: Body.Shipping.Postal,
          state: Body.Shipping.Country === "US" ? Body.Shipping.State : null,
        },
        name: Body.Shipping.Name,
      },
    });

    if (Customer && Customer.id) {
      const Session = await StripeAPI.checkout.sessions.create({
        customer: Customer.id,
        line_items: Body.Products,
        mode: "payment",
        shipping_options: [
          {
            shipping_rate_data: {
              display_name: "Standard Shipping",
              type: "fixed_amount",
              fixed_amount: {
                amount: parseInt((ShippingPrice * 100).toString()),
                currency: "usd",
              },
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: Minimum,
                },
                maximum: {
                  unit: "business_day",
                  value: Maximum,
                },
              },
            },
          },
        ],
        success_url: "https://www.petitecurioboutique.com/shop/purchase-successful",
        cancel_url: "https://www.petitecurioboutique.com/shop/purchase-canceled",
      });
      
      if (Session && Session.url) {
        return new Response(Session.url);
      } else {
        return new Response("", {
          status: 500,
          statusText: "Internal Server Error",
        });
      };
    } else {
      return new Response("", {
        status: 500,
        statusText: "Internal Server Error",
      });
    };
  } else {
    return new Response("", {
      status: 400,
      statusText: "Bad Request",
    });
  };
};