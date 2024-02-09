import { api } from "@/trpc/server";
import { MetadataRoute } from "next";

const BaseUrl = "https://www.petitecurioboutique.com";
export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const Urls: MetadataRoute.Sitemap = [
    {
      url: BaseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BaseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BaseUrl}/shop/checkout`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BaseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BaseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const Products = await api.stripeRouter.getProducts.query();
  for (const Product of Products) {
    if (Product.active) {
      Urls.push({
        url: `${BaseUrl}/shop/products/${Product.id.replace("prod_", "")}`,
        lastModified: new Date(),
        changeFrequency: "always",
        priority: 0.64,
      });
    };
  };

  return Urls;
};