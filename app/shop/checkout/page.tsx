"use client";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import ProductElement from "../product-element";
import { useCookies } from "next-client-cookies";
import LinkButton from "@/components/link-button";
import type Stripe from "stripe";

export default function Page() {
  const CookieStore = useCookies();

  const [Product, SetProduct] = useState<Stripe.Product>();
  const [UnitAmount, SetUnitAmount] = useState("");
  const [ProductId, SetProductId] = useState("");

  useEffect(function() {
    SetProduct(undefined);
    SetUnitAmount("");
    fetch(`https://petite-curio-boutique.vercel.app/api/product-information?product=prod_${ProductId}`).then(async function(ProductResponse) {
      if (ProductResponse.ok) {
        const Product = await ProductResponse.json();
        SetProduct(Product);
        fetch(`https://petite-curio-boutique.vercel.app/api/price-information?price=${Product!.default_price}`).then(async function(PriceResponse) {
          if (PriceResponse.ok) {
            const Price = await PriceResponse.json();
            SetUnitAmount(Price.unit_amount.toString());
          };
        });
      };
    });
  }, [ProductId]);

  return (
    <main>
      <header className="relative text-center before:absolute before:inset-0 before:bg-cover before:bg-no-repeat before:bg-center before:h-full before:w-full before:-z-[1] before:shop-bg-image before:brightness-50 p-4 min-[300px]:p-12 md:p-24">
        <h1 className="text-7xl">Checkout</h1>
      </header>
      <main className="flex flex-col flex-wrap justify-center p-4">
        <Suspense fallback={
          <p className="text-xl">Loading products...</p>
        }>
          {
            CookieStore.get("Cart") && Object.keys(JSON.parse(CookieStore.get("Cart")!)).length > 0 ? Object.keys(JSON.parse(CookieStore.get("Cart")!)).map(async function(Id: string, Index: number) {
              if (Product && UnitAmount.length > 0) {
                return <ProductElement id={Id} name={Product.name} description={Product.description || "No description provided."} active={Product.active} stock={Product.metadata.Stock} image0={Product.images[0]} price={parseInt(UnitAmount)! >= 100 ? parseFloat(UnitAmount.slice(0, UnitAmount.length - 2) + "." + UnitAmount.slice(UnitAmount.length - 2, UnitAmount.length)) : parseFloat("0." + UnitAmount)} deleteButton key={Id} />
              } else if (ProductId !== Id) {
                SetProductId(Id);
              };
              if (Index === Object.keys(JSON.parse(CookieStore.get("Cart")!)).length - 1 && ProductId.length > 0) {
                // return (
                //   <form onSubmit={function(Event) {
                //     Event.preventDefault();
                //   }}>
                //     <button type="submit" className="bg-yellow-500 text-white border-2 border-white p-2 rounded-lg">Checkout</button>
                //   </form>
                // );
              };
            }) : <>
              <p className="text-xl mb-2">No products were found in your cart.</p>
              <LinkButton href="/shop" textContent="Go to Shop" />
            </>
          }
        </Suspense>
      </main>
    </main>
  );
};