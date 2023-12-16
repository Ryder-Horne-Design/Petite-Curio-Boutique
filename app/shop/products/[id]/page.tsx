import LinkButton from "@/components/link-button";
import Image from "next/image";
import Link from "next/link";
import type Stripe from "stripe";

const url = "https://www.petitecurioboutique.com";
const title = "Loading Product...";
const description = "Loading product...";
const locale = "en";
export const metadata = {
  // metadataBase: new URL(url),
  title,
  description,
  openGraph: {
    title: `${title} - Petite Curio Boutique`,
    description,
    url,
    siteName: "Petite Curio Boutique",
    images: [
      {
        url: "/images/banner.webp",
        width: 1200,
        height: 630,
        alt: "Banner for Petite Curio Boutique",
      },
    ],
    locale: locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} - Petite Curio Boutique`,
    description,
    images: [
      {
        url: "/images/banner.webp",
        width: 1200,
        height: 630,
        alt: "Banner for Petite Curio Boutique",
      },
    ],
    siteId: "1406796609778700289",
    creatorId: "1685799534482636801",
  },
  alternates: {
    canonical: "/shop/products",
    languages: {
      "en": "/shop/products",
      // "fr": "/fr/shop/products",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default async function Page({params}: {params: {
  id: string,
}}) {
  metadata.alternates.canonical = `/shop/products/${params.id}`;
  metadata.alternates.languages.en = `/shop/products/${params.id}`;
  // metadata.alternates.languages.fr = `/fr/shop/products/${params.id}`;
  const ProductResponse = await fetch(`http://localhost:3002/api/product-information?product=prod_${params.id}`);
  const Product: Stripe.Product = ProductResponse.ok ? await ProductResponse.json() : {active: false};
  if (Product.active) {
    metadata.title = Product.name;
    metadata.twitter.title = metadata.openGraph.title = `${Product.name} - Petite Curio Boutique`;
    metadata.description = metadata.twitter.description = metadata.openGraph.description = Product.description || "No description provided.";
  
    return (
      <main>
        <header className="relative text-center before:absolute before:inset-0 before:bg-cover before:bg-no-repeat before:bg-center before:h-full before:w-full before:-z-[1] before:shop-bg-image before:brightness-50 p-4 min-[300px]:p-12 md:p-24">
          <h1 className="text-7xl">Shop</h1>
        </header>
        <main className="flex flex-col flex-wrap sm:flex-row sm:flex-nowrap justify-center items-center">
          
        </main>
      </main>
    );  
  } else {
    metadata.title = "Error Finding Product";
    metadata.twitter.title = metadata.openGraph.title = "Error Finding Product - Petite Curio Boutique";
    metadata.description = metadata.twitter.description = metadata.openGraph.description = "Error Finding Product";
    metadata.robots.index = false;
    
    return (
      <main className="flex flex-col flex-wrap justify-center items-center before:absolute before:inset-0 before:bg-cover before:bg-no-repeat before:bg-center before:h-full before:w-full before:-z-[1] before:shop-bg-image before:brightness-50 text-center p-4 min-[300px]:p-12 md:p-24">
        <h2 className="text-4xl mb-4">Product Not Found</h2>
        <p className="mb-2">We're awfully sorry, but it seems like we could not find that product. Please try again later.</p>
        <p className="mb-4">If you think this is a mistake, please <Link href="/contact-us" className="text-yellow-500">contact us</Link> with information about the product you were trying to find. Thank you!</p>
        <LinkButton href="/shop" textContent="Back To Shop" />
      </main>
    );
  };
}
