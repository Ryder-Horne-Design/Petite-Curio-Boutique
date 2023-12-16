import { type NextRequest } from "next/server";
import Stripe from "stripe";

export const runtime = "edge";
export async function GET(Request: NextRequest) {
  const API: Stripe = new Stripe(process.env.STRIPE_KEY!);
  const Products: {
    data: Object[],
  } = {
    data: [],
  };
  let StartingAfter: string = "";
  while (true) {
    const ProductParameters: Stripe.ProductListParams = {
      limit: 100,
    };
    if (StartingAfter.length > 0) {
      ProductParameters.starting_after = StartingAfter
    };
    const NewProducts = await API.products.list(ProductParameters);
    Products.data.push(...NewProducts.data);
    if (NewProducts.has_more) {
      StartingAfter = NewProducts.data[99].id;
    } else {
      break;
    };
  };
  return Response.json(Products);
};