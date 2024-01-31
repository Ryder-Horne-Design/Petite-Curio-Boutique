import { api } from "@/trpc/server";
import { type Metadata } from "next";

export async function generateMetadata({ params }: {
  params: {
    id: string,
  },
}): Promise<Metadata> {
  try {
    const product = await api.stripeRouter.getProductInformation.query({ productId: `prod_${params.id}` });

    const title = product.name!;
    const description = product.description || "No description provided.";
    const locale = "en";
    const url = `https://petitecurioboutique.com/shop/products/${params.id}`;

    return {
      metadataBase: new URL(url),
      title: `${title} - Petite Curio Boutique`,
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
        canonical: `/shop/products/${params.id}`,
        languages: {
          "en": `/shop/products/${params.id}`,
          // "fr": `/fr/shop/products/${params.id}`,
        },
      },
    };
  } catch(err) {
    console.warn(err);
    
    const title = "Error Finding Product";
    const description = "Product Not Found";
    const locale = "en";
    const url = `https://petitecurioboutique.com/shop/products/${params.id}`;
    
    return {
      metadataBase: new URL(url),
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
        canonical: `/shop/products/${params.id}`,
        languages: {
          "en": `/shop/products/${params.id}`,
          // "fr": `/fr/shop/products/${params.id}`,
        },
      },
      robots: {
        index: false,
        follow: true,
      },
    };
  };
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
};