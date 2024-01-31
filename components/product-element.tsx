"use client";
import Link from "next/link";
import Image from "next/image";
import { createRef, useState } from "react";
import type Stripe from "stripe";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import Cookies from "js-cookie";
import ExpandableImage from "@/components/expandable-image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Revalidate } from "@/components/actions";

export default function ProductElement({ product, price, original = 1, button }: {
  product: string,
  price: string | null,
  original?: number,
  button: "delete" | "add" | "none",
}) {
  const Product = JSON.parse(product) as Stripe.Product;
  const PriceInformation = JSON.parse(price || "{}") as Stripe.Price | null;

  const CardRef = createRef<HTMLDivElement>();
  const InfoRef = createRef<HTMLParagraphElement>();
  const [Amount, SetAmount] = useState<number>(original);

  const ProductFormSchema = z.object({
    amount: z.string({
      required_error: "You must have an amount to add to your cart.",
    }).refine(function(Value) {
      return button = "delete" || parseInt(Value) >= 1;
    }, {
      message: "You cannot add less than 1 of this item to your cart.",
    }).refine(function(Value) {
      return button = "delete" || parseInt(Value) <= (parseInt(Product.metadata.Stock) < 100 ? parseInt(Product.metadata.Stock) : 100);
    }, {
      message: "You cannot add more than the avaiable stock of this item to your cart.",
    }).default(original.toString()),
  });
  const ProductForm = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      amount: original.toString(),
    },
  });

  if (Product.active && PriceInformation && original > 0) {
    const UnitAmount = PriceInformation.unit_amount!.toString();
    const Price = parseFloat(PriceInformation.unit_amount! >= 100 ? UnitAmount.slice(0, UnitAmount.length - 2) + "." + UnitAmount.slice(UnitAmount.length - 2, UnitAmount.length) : "0." + UnitAmount);

    const AddToCart = function(Data: z.infer<typeof ProductFormSchema>) {
      if (InfoRef.current) {
        InfoRef.current.classList.add("hidden");
      };
      const Cart = JSON.parse(Cookies.get("Cart") || "{}");
      const TrueAmount = (Cart[Product.id] || 0) + parseInt(Data.amount);
      if (TrueAmount >= 1 && TrueAmount <= (parseInt(Product.metadata.Stock) < 100 ? parseInt(Product.metadata.Stock) : 100)) {
        Cart[Product.id] = TrueAmount;
        Cookies.set("Cart", JSON.stringify(Cart));
        if (InfoRef.current) {
          InfoRef.current.classList.add("text-green-600");
          InfoRef.current.classList.remove("text-red-600");
          InfoRef.current.innerText = "Item successfully added to cart!";
          InfoRef.current.classList.remove("hidden");
        };
        Revalidate("/shop/checkout", "page");
      } else if (InfoRef.current) {
        InfoRef.current.classList.add("text-red-600");
        InfoRef.current.classList.remove("text-green-600");
        InfoRef.current.innerText = "The amount item plus the amount of this item in your cart must be greater than 0 and less than or equal to 100 or the amount of the item's stock.";
        InfoRef.current.classList.remove("hidden");
      };
    };
    const RemoveFromCart = function() {
      const Cart = JSON.parse(Cookies.get("Cart") || "{}");
      delete Cart[Product.id];
      Cookies.set("Cart", JSON.stringify(Cart));
      if (CardRef.current) {
        CardRef.current.classList.add("hidden");
      };
      Revalidate("/shop/checkout", "page");
    };

    switch (button) {
      case "none":
        return (
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-2xl text-start">{Product.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-wrap sm:flex-row sm:flex-nowrap gap-4 justify-center items-center text-start">
              <Image src={Product.images[0]} alt={`Image for ${Product.name}`} width={250} height={250} sizes="(min-width: 1024px) 50vw, 100vw" className="rounded-2xl object-cover max-h-56 basis-full sm:basis-1/2" />
              <main className="basis-full sm:basis-1/2">
                <p>{Product.description ? Product.description : "No description provided."}</p>
                <p>{`$${Price}`}</p>
                {parseInt(Product.metadata.Stock) <= 3 ? <p className="text-red-600">{`${Product.metadata.Stock} in stock`}</p> : ""}
              </main>
            </CardContent>
          </Card>
        );
      case "add":
        return (
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-2xl text-start">{Product.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-wrap sm:flex-row sm:flex-nowrap gap-4 justify-center items-center text-start">
              <ExpandableImage src={Product.images[0]} alt={`Image for ${Product.name}`} width={250} height={250} sizes="(min-width: 1024px) 50vw, 100vw" className="rounded-2xl object-cover max-h-56" buttonClassName="basis-full sm:basis-1/2" />
              <main className="basis-full sm:basis-1/2">
                <p>{Product.description ? Product.description : "No description provided."}</p>
                <p>{`$${(Price * Amount).toFixed(2).toString()}`}</p>
                {parseInt(Product.metadata.Stock) <= 3 ? <p className="text-red-600">{`${Product.metadata.Stock} in stock`}</p> : ""}
                <Form {...ProductForm}>
                  <form onSubmit={ProductForm.handleSubmit(AddToCart)}>
                    <FormField control={ProductForm.control} name="amount" render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input inputMode="numeric" placeholder="Amount" {...field} onChange={function(Event) {
                            Event.currentTarget.value = Event.currentTarget.value.replace(/[^0-9]/g, "").length > 0 ? Event.currentTarget.value.replace(/[^0-9]/g, "") : "0";
                            SetAmount(parseInt(Event.currentTarget.value) || 1);
                            field.onChange(Event);
                          }} />
                        </FormControl>
                        <FormDescription>The amount of this item you would like to add to your cart.</FormDescription>
                        <FormMessage ref={InfoRef}>{" "}</FormMessage>
                      </FormItem>
                    )} />
                    <Button type="submit">Add to Cart</Button>
                  </form>
                </Form>
              </main>
            </CardContent>
          </Card>
        );
      case "delete":
        return (
          <Card className="h-full" ref={CardRef}>
            <CardHeader>
              <CardTitle className="text-2xl text-start">
                <Link href={`/shop/products/${Product.id.replace("prod_", "")}`}>
                  {Product.name}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-wrap sm:flex-row sm:flex-nowrap gap-4 justify-center items-center text-start">
              <ExpandableImage src={Product.images[0]} alt={`Image for ${Product.name}`} width={250} height={250} sizes="(min-width: 1024px) 50vw, 100vw" className="rounded-2xl object-cover max-h-56" buttonClassName="basis-full sm:basis-1/2" />
              <main className="basis-full sm:basis-1/2">
                <p>{Product.description ? Product.description : "No description provided."}</p>
                <p>{`$${(Price * Amount).toFixed(2).toString()}`}</p>
                {parseInt(Product.metadata.Stock) <= 3 ? <p className="text-red-600">{`${Product.metadata.Stock} in stock`}</p> : ""}
                <Form {...ProductForm}>
                  <form onSubmit={ProductForm.handleSubmit(RemoveFromCart)}>
                    <FormField control={ProductForm.control} name="amount" render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input inputMode="numeric" placeholder="Amount" {...field} onChange={async function(Event) {
                            InfoRef.current?.classList?.add("hidden");
                            Event.currentTarget.value = Event.currentTarget.value.replace(/[^0-9]/g, "").length > 0 ? Event.currentTarget.value.replace(/[^0-9]/g, "") : "0";
                            const TrueAmount = parseInt(Event.currentTarget.value || "0");
                            if (TrueAmount >= 1 && TrueAmount <= (parseInt(Product.metadata.Stock) < 100 ? parseInt(Product.metadata.Stock) : 100)) {    
                              const Cart = JSON.parse(Cookies.get("Cart") || "{}");
                              Cart[Product.id] = TrueAmount;
                              Cookies.set("Cart", JSON.stringify(Cart));
                              SetAmount(parseInt(Event.currentTarget.value) || 1);
                              setTimeout(function() {
                                Revalidate("/shop/checkout", "page");
                              });
                            } else if (InfoRef.current) {
                              InfoRef.current.classList.add("text-red-600");
                              InfoRef.current.classList.remove("text-green-600");
                              InfoRef.current.innerText = "The amount item plus the amount of this item in your cart must be greater than 0 and less than or equal to 100 or the amount of the item's stock.";
                              InfoRef.current.classList.remove("hidden");
                            };
                            field.onChange(Event);
                          }} />
                        </FormControl>
                        <FormDescription>The amount of this item you would like to add to your cart.</FormDescription>
                        <FormMessage ref={InfoRef}>{" "}</FormMessage>
                      </FormItem>
                    )} />
                    <Button type="submit">Remove from Cart</Button>
                  </form>
                </Form>
              </main>
            </CardContent>
          </Card>
        );
      default: console.warn("No allowed button type was defined");
    };
  };
};