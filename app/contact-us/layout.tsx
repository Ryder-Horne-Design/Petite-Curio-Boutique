const url = "https://www.petitecurioboutique.com";
const title = "Contact Us";
const description = "If you need to contact us for any reason, please fill out the form below and we'll get back to you soon!";
const locale = "en";
export const metadata = {
  metadataBase: new URL(url),
  title,
  description,
  openGraph: {
    title: `${title} - Petite Curio Boutique`,
    description,
    url: `${url}/contact-us`,
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
    canonical: "/contact-us",
    languages: {
      "x-default": "/contact-us",
      "en": "/contact-us",
      // "fr": "/fr/contact-us",
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
};