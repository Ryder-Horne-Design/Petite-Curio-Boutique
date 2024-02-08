import Link from "next/link";
import { Suspense } from "react";
import { api } from "@/trpc/server";
import ProductElement from "@/components/product-element";
import LinkButton from "@/components/link-button";
import PageHeader from "@/components/page-header";

export default async function Page({ params }: {params: {
  id: string,
}}) {
  try {
    const Product = await api.stripeRouter.getProductInformation.query({ productId: `prod_${params.id}` });
    return (
      <main>
        <PageHeader src="/images/shop.png" alt="Shop background image">
          <h1 className="text-4xl sm:text-7xl">Shop</h1>
        </PageHeader>
        <main className="p-8">
          <Suspense fallback={
            <p>Loading product...</p>
          }>
            {
              Product ? <ProductElement product={JSON.stringify(Product)} price={JSON.stringify(await api.stripeRouter.getPriceInformation.query({ priceId: Product.default_price as string }) || "{}")} button="add" /> : <main className="flex flex-col flex-wrap justify-center items-center before:absolute before:inset-0 before:bg-cover before:bg-no-repeat before:bg-center before:h-full before:w-full before:-z-[1] before:shop-bg-image before:brightness-50 text-center p-4 min-[300px]:p-12 md:p-24">
                <h2 className="text-4xl mb-4">Product Not Found</h2>
                <p className="mb-2">We&apos;re awfully sorry, but it seems like we could not find that product. Please try again later.</p>
                <p className="mb-4">If you think this is a mistake, please <Link href="/contact-us" className="text-yellow-500">contact us</Link> with information about the product you were trying to find. Thank you!</p>
                <LinkButton href="/shop" textContent="Back To Shop" />
              </main>
            }
          </Suspense>
        </main>
      </main>
    );
  } catch(Err) {
    console.warn(Err);
    return (
      <main className="flex flex-col flex-wrap justify-center items-center before:absolute before:inset-0 before:bg-cover before:bg-no-repeat before:bg-center before:h-full before:w-full before:-z-[1] before:shop-bg-image before:brightness-50 text-center p-4 min-[300px]:p-12 md:p-24">
        <h2 className="text-4xl mb-4">Product Not Found</h2>
        <p className="mb-2">We&apos;re awfully sorry, but it seems like we could not find that product. Please try again later.</p>
        <p className="mb-4">If you think this is a mistake, please <Link href="/contact-us" className="text-yellow-500">contact us</Link> with information about the product you were trying to find. Thank you!</p>
        <LinkButton href="/shop" textContent="Back To Shop" />
      </main>
    );
  };
};