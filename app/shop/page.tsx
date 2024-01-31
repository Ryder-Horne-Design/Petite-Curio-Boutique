import Link from "next/link";
import { Suspense } from "react";
import z from "zod";
import type Stripe from "stripe";
import { api } from "@/trpc/server";
import ProductElement from "@/components/product-element";
import SearchForm from "@/components/search-form";

async function ServerProductElement({ Product }: {
  Product: Stripe.Product,
}) {
  const PriceInformation = await api.stripeRouter.getPriceInformation.query({
    priceId: Product.default_price as string,
  });
  return <ProductElement product={JSON.stringify(Product)} price={JSON.stringify(PriceInformation)} button="none" />
};

export default async function Page({ searchParams }: {
  searchParams: {
    [Key: string]: string | string[] | undefined,
  },
}) {
  let Elements = 0;

  const UnfilteredProducts = await api.stripeRouter.getProducts.query();
  const Products = UnfilteredProducts.filter(function(Product) {
    return searchParams.search?.length && searchParams.search!.length > 0 ? Product.name.toLowerCase().includes((searchParams.search! as string).toLowerCase()) : true;
  });

  return (
    <main>
      <header className="relative text-center before:absolute before:inset-0 before:bg-cover before:bg-no-repeat before:bg-center before:h-full before:w-full before:-z-[1] before:shop-bg-image before:brightness-50 p-4 min-[300px]:p-12 md:p-24">
        <h1 className="text-7xl">Shop</h1>
      </header>
      <section className="p-4">
        <SearchForm />
      </section>
      <main className="grid lg:grid-cols-2 px-4 text-center gap-2 mb-4">
        <Suspense fallback={
          <p className="text-xl">Loading products...</p>
        }>
          {
            Products.map(function(Product, Index: number) {
              if (Index === 0) {
                Elements = 0;
              };
              // if (Product.active && (Search.length === 0 || Product.name.toLowerCase().includes(Search.toLowerCase()))) {
              if (Product.active) {
                Elements++;
                return (
                  <Link href={`/shop/products/${Product.id.replace("prod_", "")}`} key={Product.id.replace("prod_", "")}>
                    <ServerProductElement Product={Product} />
                  </Link>
                );
              } else if (Index === Products.length - 1 && Elements === 0) {
                return (
                  <p className="text-xl" key={Product.id.replace("prod_", "")}>No products found.</p>
                );
              };
            })
          }
        </Suspense>
      </main>
    </main>
  );
};