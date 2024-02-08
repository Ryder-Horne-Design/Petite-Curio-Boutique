import { type NextRequest } from "next/server";
import Stripe from "stripe";

const StripeAPI = new Stripe(process.env.STRIPE_KEY!);
const CachedSession: string[] = [];

async function FullfillOrder(Session: Stripe.Checkout.Session) {
  if (CachedSession.includes(Session.id) || Session.payment_status !== "paid") {
    return;
  };
  CachedSession.push(Session.id);

  const Items: Stripe.LineItem[] = [];
  let StartingAfter = "";
  while (true) {
    const CheckoutItems = await StripeAPI.checkout.sessions.listLineItems(Session.id, {
      limit: 100,
      starting_after: StartingAfter.length > 0 ? StartingAfter : undefined,
    });
    Items.push(...CheckoutItems.data);
    if (CheckoutItems.has_more) {
      StartingAfter = CheckoutItems.data[CheckoutItems.data.length - 1].id;
    } else {
      break;
    };
  };

  for (const Item of Items) {
    const ProductData = await StripeAPI.products.retrieve(Item.price!.product as string);
    await StripeAPI.products.update(Item.id, {
      metadata: {
        Stock: (parseInt(ProductData.metadata.Stock) - Item.quantity!).toString(),
      },
    });
  };

  return;
};

export const runtime = "edge";
export async function POST(Request: NextRequest) {
  const Body = await Request.text();
  const Signature = Request.headers.get("Stripe-Signature");

  try {
    const Event = await StripeAPI.webhooks.constructEventAsync(Body, Signature!, process.env.STRIPE_STOCK_WEBHOOK!);
    const Data = Event.data.object as Stripe.Checkout.Session;

    switch (Event.type) {
      case "checkout.session.completed":
        await FullfillOrder(Data);
        break;
      case "checkout.session.async_payment_succeeded":
        await FullfillOrder(Data);
        break;
      default:
        console.log(`Unhandled event type ${Event.type}`);
    };
  } catch(Err) {
    console.warn(`Webhook error: ${Err instanceof Stripe.errors.StripeSignatureVerificationError ? Err.message : Err}`);
    return new Response(JSON.stringify(`Webhook error: ${Err instanceof Stripe.errors.StripeSignatureVerificationError ? Err.message : Err}`), {
      status: 400,
    });
  };

  return new Response(JSON.stringify("Success"), {
    status: 200,
  });
};