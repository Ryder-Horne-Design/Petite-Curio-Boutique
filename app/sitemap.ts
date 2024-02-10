import { api } from "@/trpc/server";
import { MetadataRoute } from "next";

const BaseUrl = "https://www.petitecurioboutique.com";

export const dynamic = "force-dynamic";
export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const BuildDate = new Date(process.env.NEXT_PUBLIC_BUILD_DATE!);
  const Urls: MetadataRoute.Sitemap = [
    {
      url: BaseUrl,
      lastModified: BuildDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BaseUrl}/shop/checkout`,
      lastModified: BuildDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // {
    //   url: `${BaseUrl}/blog`,
    //   lastModified: BuildDate,
    //   changeFrequency: "daily",
    //   priority: 0.8,
    // },
    {
      url: `${BaseUrl}/contact-us`,
      lastModified: BuildDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  let ShopUpdated = new Date(0);
  const Products = await api.stripeRouter.getProducts.query();
  for (const Product of Products) {
    if (Product.active) {
      Urls.push({
        url: `${BaseUrl}/shop/products/${Product.id.replace("prod_", "")}`,
        lastModified: new Date(Product.updated * 1000),
        changeFrequency: "always",
        priority: 0.64,
      });
    };
    if (ShopUpdated.getTime() - new Date(Product.updated * 1000).getTime() < 0) {
      ShopUpdated = new Date(Product.updated * 1000);
    };
  };

  Urls.push({
    url: `${BaseUrl}/shop`,
    lastModified: ShopUpdated,
    changeFrequency: "always",
    priority: 0.8,
  });

  return Urls;
};