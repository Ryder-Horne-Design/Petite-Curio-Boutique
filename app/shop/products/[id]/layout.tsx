const url = "https://www.petitecurioboutique.com";
const title = "Loading Product...";
const description = "Loading product...";
const locale = "en";
export const metadata = {
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

export default function Layout({children, params}: {children: React.ReactNode, params: {
  id: string,
}}) {
  metadata.alternates.canonical = `/shop/products/${params.id}`;
  metadata.alternates.languages.en = `/shop/products/${params.id}`;
  // metadata.alternates.languages.fr = `/fr/shop/products/${params.id}`;

  fetch(`https://petite-curio-boutique.vercel.app/api/product-information?product=prod_${params.id}`).then(function(ProductResponse) {
    if (ProductResponse.ok) {
      ProductResponse.json().then(function(Product) {
        if (Product.active) {
          metadata.title = metadata.twitter.title = metadata.openGraph.title = `${Product.name} - Petite Curio Boutique`;
          metadata.description = metadata.twitter.description = metadata.openGraph.description = Product.description || "No description provided.";
        } else {
          metadata.title = metadata.twitter.title = metadata.openGraph.title = "Error Finding Product - Petite Curio Boutique";
          metadata.description = metadata.twitter.description = metadata.openGraph.description = "Error Finding Product";
          metadata.robots.index = false;
        };
      });
    } else {
      metadata.title = metadata.twitter.title = metadata.openGraph.title = "Error Finding Product - Petite Curio Boutique";
      metadata.description = metadata.twitter.description = metadata.openGraph.description = "Error Finding Product";
      metadata.robots.index = false;
    };
  });

  return children;
};