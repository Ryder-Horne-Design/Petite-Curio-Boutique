"use server";
import { api } from "@/trpc/server";
import { revalidatePath } from "next/cache";

export async function Revalidate(Path: string, Type: "page" | "layout" = "page") {
  revalidatePath(Path, Type);
  return;
};

export async function CreateCheckoutSession(Input: typeof api.stripeRouter.createCheckoutSession.query.arguments) {
  const Response = await api.stripeRouter.createCheckoutSession.query(Input);
  return Response;
};

export async function SendEmail(Input: typeof api.emailRouter.sendEmail.query.arguments) {
  const Response = await api.emailRouter.sendEmail.query(Input);
  return Response;
};