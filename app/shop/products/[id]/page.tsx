import LinkButton from "@/components/link-button";
import Link from "next/link";
import type Stripe from "stripe";
import ProductElement from "./product-element";

export default function Page({params}: {params: {
  id: string,
}}) {
  return fetch(`/api/product-information?product=prod_${params.id}`).then(function(ProductResponse) {
    if (ProductResponse.ok) {
      return ProductResponse.json().then(function(Product: Stripe.Product) {
        return <ProductElement id={params.id} name={Product.name} description={Product.description || "No description provided."} active={Product.active} stock={Product.metadata.Stock} image0={Product.images[0]} />;
      });
    } else {
      return (
        <main className="flex flex-col flex-wrap justify-center items-center before:absolute before:inset-0 before:bg-cover before:bg-no-repeat before:bg-center before:h-full before:w-full before:-z-[1] before:shop-bg-image before:brightness-50 text-center p-4 min-[300px]:p-12 md:p-24">
          <h2 className="text-4xl mb-4">Product Not Found</h2>
          <p className="mb-2">We&apos;re awfully sorry, but it seems like we could not find that product. Please try again later.</p>
          <p className="mb-4">If you think this is a mistake, please <Link href="/contact-us" className="text-yellow-500">contact us</Link> with information about the product you were trying to find. Thank you!</p>
          <LinkButton href="/shop" textContent="Back To Shop" />
        </main>
      );
    };
  });
};