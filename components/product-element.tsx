import Image from "next/image";
import { Suspense } from "react";
import ExpandableImage from "@/components/expandable-image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { api } from "@/trpc/server";
import { AddToCartForm, RemoveFromCartForm } from "./product-forms";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function ProductElement({ productId, button }: {
  productId: string,
  button: "delete" | "add" | "none",
}) {
  const Product = await api.stripeRouter.getProductInformation.query({ productId: productId });

  async function PriceTag() {
    const PriceInformation = await api.stripeRouter.getPriceInformation.query({ priceId: Product.default_price as string });
    const UnitAmount = PriceInformation.unit_amount!.toString();
    const Price = parseFloat(PriceInformation.unit_amount! >= 100 ? UnitAmount.slice(0, UnitAmount.length - 2) + "." + UnitAmount.slice(UnitAmount.length - 2, UnitAmount.length) : "0." + UnitAmount);
    return (
      <p>${Price}</p>
    );
  };
  async function ServerAddToCartForm() {
    const PriceInformation = await api.stripeRouter.getPriceInformation.query({ priceId: Product.default_price as string });
    const UnitAmount = PriceInformation.unit_amount!.toString();
    const Price = parseFloat(PriceInformation.unit_amount! >= 100 ? UnitAmount.slice(0, UnitAmount.length - 2) + "." + UnitAmount.slice(UnitAmount.length - 2, UnitAmount.length) : "0." + UnitAmount);
    return (
      <AddToCartForm productId={Product.id} stock={Product.metadata.Stock} price={Price} />
    );
  };
  async function ServerRemoveFromCartForm() {
    const PriceInformation = await api.stripeRouter.getPriceInformation.query({ priceId: Product.default_price as string });
    const UnitAmount = PriceInformation.unit_amount!.toString();
    const Price = parseFloat(PriceInformation.unit_amount! >= 100 ? UnitAmount.slice(0, UnitAmount.length - 2) + "." + UnitAmount.slice(UnitAmount.length - 2, UnitAmount.length) : "0." + UnitAmount);
    const CookieStore = cookies();
    return (
      <RemoveFromCartForm productId={Product.id} stock={Product.metadata.Stock} price={Price} original={JSON.parse(CookieStore.get("Cart")?.value || "{}")[Product.id] ? JSON.parse(CookieStore.get("Cart")?.value || "{}")[Product.id].toString() : "1"} />
    );
  };

  if (Product.active) {    
    switch (button) {
      case "none":
        return (
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-2xl text-start">{Product.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-wrap sm:flex-row sm:flex-nowrap gap-4 justify-center text-start">
              <Image src={Product.images[0]} alt={`Image for ${Product.name}`} width={1000} height={1000} sizes="(min-width: 1024px) 25vw, 50vw" className="rounded-2xl object-cover basis-full sm:basis-1/2" />
              <main className="basis-full sm:basis-1/2">
                <p>{Product.description ? Product.description : "No description provided."}</p>
                <PriceTag />
                {parseInt(Product.metadata.Stock) <= 3 ? <p className="text-red-600">{`${Product.metadata.Stock} in stock`}</p> : ""}
              </main>
            </CardContent>
          </Card>
        );
      case "add":
        return (
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-2xl text-start">{Product.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-wrap sm:flex-row sm:flex-nowrap gap-4 justify-center items-center text-start">
              <Carousel className="basis-full sm:basis-1/2">
                <CarouselContent className="w-full items-center">
                  {
                    Product.images.map(function(Image, Index) {
                      const ImageAlts = JSON.parse(Product.metadata.ImageAlts || "[]");

                      return (
                        <CarouselItem className="basis-full" key={Image}>
                          <ExpandableImage src={Image} alt={ImageAlts && ImageAlts[Index] ? ImageAlts[Index] : `Image ${Index + 1} of ${Product.name}`} width={1000} height={1000} sizes="(min-width: 1024px) 25vw, 50vw" className="rounded-2xl object-cover" buttonClassName="w-full" loading="eager" priority={Index === 0} />
                        </CarouselItem>
                      );
                    })
                  }
                </CarouselContent>
                {Product.images.length > 1 ? <CarouselPrevious /> : ""}
                {Product.images.length > 1 ? <CarouselNext /> : ""}
              </Carousel>
              <main className="basis-full sm:basis-1/2">
                <p>{Product.description ? Product.description : "No description provided."}</p>
                <Suspense fallback={<p>Loading product information...</p>}>
                  <ServerAddToCartForm />
                </Suspense>
              </main>
            </CardContent>
          </Card>
        );
      case "delete":
        return (
          <Card className="h-full" id={`${Product.id}_card`}>
            <CardHeader>
              <CardTitle className="text-2xl text-start">
                <Link href={`/shop/products/${Product.id.replace("prod_", "")}`}>
                  {Product.name}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-wrap sm:flex-row sm:flex-nowrap gap-4 justify-center items-center text-start">
              <Carousel className="basis-full sm:basis-1/2">
                <CarouselContent className="w-full items-center">
                  {
                    Product.images.map(function(Image, Index) {
                      const ImageAlts = JSON.parse(Product.metadata.ImageAlts || "[]");

                      return (
                        <CarouselItem className="basis-full" key={Image}>
                          <ExpandableImage src={Image} alt={ImageAlts && ImageAlts[Index] ? ImageAlts[Index] : `Image ${Index + 1} of ${Product.name}`} width={1000} height={1000} sizes="(min-width: 1024px) 25vw, 50vw" className="rounded-2xl object-cover" buttonClassName="w-full" loading="eager" />
                        </CarouselItem>
                      );
                    })
                  }
                </CarouselContent>
                {Product.images.length > 1 ? <CarouselPrevious /> : ""}
                {Product.images.length > 1 ? <CarouselNext /> : ""}
              </Carousel>
              <main className="basis-full sm:basis-1/2">
                <p>{Product.description ? Product.description : "No description provided."}</p>
                <Suspense fallback={<p>Loading product information...</p>}>
                  <ServerRemoveFromCartForm />
                </Suspense>
              </main>
            </CardContent>
          </Card>
        );
      default: console.warn("No allowed button type was defined");
    };
  };
};