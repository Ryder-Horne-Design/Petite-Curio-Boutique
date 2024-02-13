const url = "https://www.petitecurioboutique.com";
const title = "Reviews";
const description = "Find out what people are saying about us.";
const locale = "en";
export const metadata = {
  metadataBase: new URL(url),
  title,
  description,
  openGraph: {
    title: `${title} - Petite Curio Boutique`,
    description,
    url: `${url}/reviews`,
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
    canonical: "/reviews",
    languages: {
      "en": "/reviews",
      // "fr": "/fr/reviews",
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
};