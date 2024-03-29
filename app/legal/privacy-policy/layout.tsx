const url = "https://www.petitecurioboutique.com";
const title = "Privacy Policy";
const description = "Learn about how we care about your privacy and handle your data.";
const locale = "en";
export const metadata = {
  metadataBase: new URL(url),
  title,
  description,
  openGraph: {
    title: `${title} - Petite Curio Boutique`,
    description,
    url: `${url}/legal/privacy-policy`,
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
    canonical: "/legal/privacy-policy",
    languages: {
      "x-default": "/legal/privacy-policy",
      "en": "/legal/privacy-policy",
      // "fr": "/fr/legal/privacy-policy",
    },
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
};