import Link from "next/link";
import { Suspense } from "react";
import type Stripe from "stripe";
import { api } from "@/trpc/server";
import ProductElement from "@/components/product-element";
import SearchForm from "@/components/search-form";
import PageHeader from "@/components/page-header";

export const dynamic = "force-dynamic";
export default async function Page({ searchParams }: {
  searchParams: {
    [Key: string]: string,
  },
}) {
  let Elements = 0;

  const UnfilteredProducts = await api.stripeRouter.getProducts.query();
  const Products = UnfilteredProducts.filter(function(Product) {
    return searchParams.search?.length && searchParams.search!.length > 0 ? Product.name.toLowerCase().includes(searchParams.search.toLowerCase()) : true;
  });

  return (
    <main>
      <PageHeader src="/images/shop.png" alt="Shop background image">
        <h1 className="text-4xl sm:text-7xl">Shop</h1>
      </PageHeader>
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
              if (Product.active) {
                Elements++;
                return (
                  <Link href={`/shop/products/${Product.id.replace("prod_", "")}`} key={Product.id.replace("prod_", "")}>
                    <ProductElement productId={Product.id} button="none" />
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