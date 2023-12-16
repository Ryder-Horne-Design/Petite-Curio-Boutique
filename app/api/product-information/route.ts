import { type NextRequest } from "next/server";
import Stripe from "stripe";

export const runtime = "edge";
export async function GET(Request: NextRequest) {
  const API: Stripe = new Stripe(process.env.STRIPE_KEY!);
  if (Request.nextUrl.searchParams.get("product")) {
    return Response.json(await API.products.retrieve(Request.nextUrl.searchParams.get("product")!));
  } else {
    return Response.json({
      success: false,
      message: "No product id was provided. Please try again with a product id.",
    });
  };
};