import "@/css/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/header";
import Footer from "@/components/footer";

const url = "https://www.petitecurioboutique.com";
const title = "Petite Curio Boutique";
const description = "Selling vintage pieces that send you back to your childhood & fond memories of yesteryear. Occasionally making things that fit my fancy.";
const locale = "en";
export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: `%s - ${title}`,
  },
  description: description,
  openGraph: {
    title: title,
    description: description,
    url: url,
    siteName: title,
    images: [
      {
        url: "/images/banner.webp",
        width: 1200,
        height: 630,
        alt: `Banner for ${title}`,
      },
    ],
    locale: locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: [
      {
        url: "/images/banner.webp",
        width: 1200,
        height: 630,
        alt: `Banner for ${title}`,
      },
    ],
    siteId: "1406796609778700289",
    creatorId: "1685799534482636801",
  },
  manifest: "/ico/site.webmanifest",
  icons: {
    icon: [
      {
        url: "/ico/favicon-16x16.png",
        sizes: "16x16",
      },
      {
        url: "/ico/favicon-32x32.png",
        sizes: "32x32",
      },
      {
        url: "/ico/favicon.ico",
        sizes: "48x48",
      },
      {
        url: "/ico/android-chrome-192x192.png",
        sizes: "192x192",
      },
    ],
    shortcut: ["/ico/favicon.ico"],
    apple: [
      {
        url: "/ico/apple-touch-icon-57x57.png",
        sizes: "57x57",
      },
      {
        url: "/ico/apple-touch-icon-60x60.png",
        sizes: "60x60",
      },
      {
        url: "/ico/apple-touch-icon-72x72.png",
        sizes: "72x72",
      },
      {
        url: "/ico/apple-touch-icon-76x76.png",
        sizes: "76x76",
      },
      {
        url: "/ico/apple-touch-icon-114x114.png",
        sizes: "114x114",
      },
      {
        url: "/ico/apple-touch-icon-120x120.png",
        sizes: "120x120",
      },
      {
        url: "/ico/apple-touch-icon-152x152.png",
        sizes: "152x152",
      },
      {
        url: "/ico/apple-touch-icon-180x180.png",
        sizes: "180x180",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/ico/safari-pinned-tab.svg",
      },
      {
        rel: "apple-touch-icon-precomposed",
        url: "/ico/apple-touch-icon-57x57-precomposed.png",
        sizes: "57x57",
      },
      {
        rel: "apple-touch-icon-precomposed",
        url: "/ico/apple-touch-icon-60x60-precomposed.png",
        sizes: "60x60",
      },
      {
        rel: "apple-touch-icon-precomposed",
        url: "/ico/apple-touch-icon-72x72-precomposed.png",
        sizes: "72x72",
      },
      {
        rel: "apple-touch-icon-precomposed",
        url: "/ico/apple-touch-icon-76x76-precomposed.png",
        sizes: "76x76",
      },
      {
        rel: "apple-touch-icon-precomposed",
        url: "/ico/apple-touch-icon-114x114-precomposed.png",
        sizes: "114x114",
      },
      {
        rel: "apple-touch-icon-precomposed",
        url: "/ico/apple-touch-icon-120x120-precomposed.png",
        sizes: "120x120",
      },
      {
        rel: "apple-touch-icon-precomposed",
        url: "/ico/apple-touch-icon-144x144-precomposed.png",
        sizes: "144x144",
      },
      {
        rel: "apple-touch-icon-precomposed",
        url: "/ico/apple-touch-icon-152x152-precomposed.png",
        sizes: "152x152",
      },
      {
        rel: "apple-touch-icon-precomposed",
        url: "/ico/apple-touch-icon-180x180-precomposed.png",
        sizes: "180x180",
      },
    ],
  },
  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      // "fr": "/fr",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

const Huntsman = localFont({
  display: "swap",
  fallback: ["Parkavenue", "Luminari", "fantasy", "Arial", "sans-serif"],
  src: "../public/fonts/The\ Huntsman.ttf",
  variable: "--header-font",
});
const Chanticleer = localFont({
  display: "swap",
  fallback: ["Times New Roman", "Times", "serif"],
  src: "../public/fonts/Chanticleer\ Roman\ NF.ttf",
});
export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html className={`scroll-smooth bg-[#2c2c2c] selection:bg-yellow-500 ${Chanticleer.className} ${Huntsman.variable}`} lang={locale}>
      <body className="flex flex-col min-h-screen text-white text-lg">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
};