import { type NextRequest } from "next/server";
import Stripe from "stripe";

const StripeAPI = new Stripe(process.env.STRIPE_KEY!);

async function CreatePost(Product: Stripe.Product) {
  return;
};

export const runtime = "edge";
export async function POST(Request: NextRequest) {
  const Body = await Request.text();
  const Signature = Request.headers.get("Stripe-Signature");

  try {
    const Event = await StripeAPI.webhooks.constructEventAsync(Body, Signature!, process.env.STRIPE_POST_WEBHOOK!);
    const Data = Event.data.object as Stripe.Checkout.Session;

    switch (Event.type) {
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