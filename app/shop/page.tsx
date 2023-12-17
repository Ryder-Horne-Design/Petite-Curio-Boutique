"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Suspense, createRef, useEffect, useState } from "react";

export default function Page() {
  const Router = useRouter();
  const Query = useSearchParams();
  const Pathname = usePathname();
  const SearchInfoRef = createRef<HTMLParagraphElement>();

  const [Products, SetProducts] = useState([]);

  useEffect(function() {
    fetch("http://localhost:3000/api/products").then(async function(response) {
      if (response.ok) {
        const Products = await response.json();
        SetProducts(Products.data);
      };
    });
  }, []);
  
  return (
    <main>
      <header className="relative text-center before:absolute before:inset-0 before:bg-cover before:bg-no-repeat before:bg-center before:h-full before:w-full before:-z-[1] before:shop-bg-image before:brightness-50 p-4 min-[300px]:p-12 md:p-24">
        <h1 className="text-7xl">Shop</h1>
      </header>
      <section className="p-4 text-center">
        <h2 className="text-4xl mb-2">Search</h2>
        <main className="inline-flex justify-center items-center gap-2 border-b-2 border-b-white transition-colors duration-300 focus-within:border-b-yellow-500">
          <svg className="h-5 fill-white" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
          </svg>
          <input type="text" className="bg-transparent focus:outline-none" placeholder="Your search here..." onInput={function(Event) {
            const Input = Event.target as HTMLInputElement;
            const Value = Input.value;
            if ((!Query.has("search") && Value.length > 0) || Value !== Query.get("search")) {
              SearchInfoRef.current!.innerText = "Press enter to confirm your search.";
              SearchInfoRef.current!.classList.remove("hidden");
            } else {
              SearchInfoRef.current!.classList.add("hidden");
            };
          }} onKeyDown={
            function(Event) {
              if (Event.key === "Enter") {
                const Input = Event.target as HTMLInputElement;
                const Value = Input.value;
                const CurrentQuery = new URLSearchParams(Array.from(Query.entries()));
                if (Value.length > 0) {
                  CurrentQuery.set("search", Value);
                } else {
                  CurrentQuery.delete("search");
                };
                Router.push(`${Pathname}?${CurrentQuery.toString()}`);
                SearchInfoRef.current!.classList.add("hidden");
              };
            }
          }></input>
        </main>
        <p ref={SearchInfoRef} className="hidden"></p>
      </section>
      <main className="grid sm:grid-cols-2 lg:grid-cols-4 px-4 justify-center text-center gap-2 mb-4">
        <Suspense fallback={
          <p className="text-xl">Loading products...</p>
        }>
          {
            Products.map(async function(Product: {
              active: boolean,
              id: string,
              images: string[],
              name: string,
              metadata: {
                Stock: string,
              },
              default_price: string,
            }) {
              if (Product.active) {
                const PriceResponse = await fetch(`http://localhost:3000/api/price-information?price=${Product.default_price}`)
                const PriceInformation: {
                  unit_amount: number,
                } = PriceResponse ? await PriceResponse.json() : {unit_amount: 500};
                const UnitAmount = PriceInformation.unit_amount!.toString();
                return (
                  <Link href={`/shop/products/${Product.id.replace("prod_", "")}`} key={Product.id.replace("prod_", "")}>
                    <header className="flex flex-col flex-wrap justify-center items-center gap-y-2">
                      <Image src={Product.images[0]} alt={`Image for ${Product.name}`} width={250} height={250} className="rounded-2xl object-cover max-h-56"></Image>
                      <h3 className="text-3xl px-2">{Product.name}</h3>
                    </header>
                    <main>
                      <p>{`$${PriceInformation.unit_amount! >= 100 ? UnitAmount.slice(0, UnitAmount.length - 2) + "." + UnitAmount.slice(UnitAmount.length - 2, UnitAmount.length) : "0." + UnitAmount}`}</p>
                      {parseInt(Product.metadata.Stock) <= 3 ? <p className="text-red-600">{`${Product.metadata.Stock} in stock`}</p> : ""}
                    </main>
                  </Link>
                );
              };
            })
          }
        </Suspense>
      </main>
    </main>
  )
};