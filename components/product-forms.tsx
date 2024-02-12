"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { createRef, useState } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Cookies from "js-cookie";
import { Revalidate } from "./actions";

export function AddToCartForm({ productId, stock, price }: {
  productId: string,
  stock: string,
  price: number,
}) {
  const InfoRef = createRef<HTMLParagraphElement>();
  const [Amount, SetAmount] = useState<number>(1);

  const ProductFormSchema = z.object({
    amount: z.string({
      required_error: "You must have an amount to add to your cart.",
    }).refine(function(Value) {
      return parseInt(Value) >= 1;
    }, {
      message: "You cannot add less than 1 of this item to your cart.",
    }).refine(function(Value) {
      return parseInt(Value) <= (parseInt(stock) < 100 ? parseInt(stock) : 100);
    }, {
      message: "You cannot add more than the avaiable stock of this item to your cart.",
    }).default("1"),
  });
  const ProductForm = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      amount: "1",
    },
  });

  const AddToCart = function(Data: z.infer<typeof ProductFormSchema>) {
    if (InfoRef.current) {
      InfoRef.current.classList.add("hidden");
    };
    const Cart = JSON.parse(Cookies.get("Cart") || "{}");
    const TrueAmount = (Cart[productId] || 0) + parseInt(Data.amount);
    if (TrueAmount >= 1 && TrueAmount <= (parseInt(stock) < 100 ? parseInt(stock) : 100)) {
      Cart[productId] = TrueAmount;
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

  return ([
    <p key={`${productId}_price`}>{`$${(price * Amount).toFixed(2).toString()}`}</p>,
    parseInt(stock) <= 3 ? <p key={`${productId}_stock`} className="text-red-600">{`${stock} in stock`}</p> : "",
    <Form key={`${productId}_addform`} {...ProductForm}>
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
  ]);
};

export function RemoveFromCartForm({ productId, stock, price, original }: {
  productId: string,
  stock: string,
  price: number,
  original: string,
}) {
  const InfoRef = createRef<HTMLParagraphElement>();
  const [Amount, SetAmount] = useState<number>(1);

  const ProductFormSchema = z.object({
    amount: z.string({
      required_error: "You must have an amount to add to your cart.",
    }).refine(function(Value) {
      return parseInt(Value) >= 1;
    }, {
      message: "You cannot add less than 1 of this item to your cart.",
    }).refine(function(Value) {
      return parseInt(Value) <= (parseInt(stock) < 100 ? parseInt(stock) : 100);
    }, {
      message: "You cannot add more than the avaiable stock of this item to your cart.",
    }).default(original),
  });
  const ProductForm = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      amount: original,
    },
  });

  const RemoveFromCart = function() {
    const Cart = JSON.parse(Cookies.get("Cart") || "{}");
    delete Cart[productId];
    Cookies.set("Cart", JSON.stringify(Cart));
    if (document.getElementById(`${productId}_card`)) {
      document.getElementById(`${productId}_card`)!.classList.add("hidden");
    };
    Revalidate("/shop/checkout", "page");
  };

  return ([
    <p key={`${productId}_price`}>{`$${(price * Amount).toFixed(2).toString()}`}</p>,
    parseInt(stock) <= 3 ? <p key={`${productId}_stock`} className="text-red-600">{`${stock} in stock`}</p> : "",
    <Form key={`${productId}_deleteform`} {...ProductForm}>
      <form onSubmit={ProductForm.handleSubmit(RemoveFromCart)}>
        <FormField control={ProductForm.control} name="amount" render={({ field }) => (
          <FormItem className="mb-2">
            <FormLabel>Amount</FormLabel>
            <FormControl>
              <Input inputMode="numeric" placeholder="Amount" {...field} onChange={async function(Event) {
                InfoRef.current?.classList?.add("hidden");
                Event.currentTarget.value = Event.currentTarget.value.replace(/[^0-9]/g, "").length > 0 ? Event.currentTarget.value.replace(/[^0-9]/g, "") : "0";
                const TrueAmount = parseInt(Event.currentTarget.value || "0");
                if (TrueAmount >= 1 && TrueAmount <= (parseInt(stock) < 100 ? parseInt(stock) : 100)) {    
                  const Cart = JSON.parse(Cookies.get("Cart") || "{}");
                  Cart[productId] = TrueAmount;
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
  ]);
};