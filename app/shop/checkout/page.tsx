import { cookies } from "next/headers";
import { Suspense } from "react";
import { api } from "@/trpc/server";
import ProductElement from "@/components/product-element";
import LinkButton from "@/components/link-button";
import CheckoutForm from "@/components/checkout-form";

async function ServerProductElement({ id, original }: {
  id: string,
  original: number,
}) {
  const Product = await api.stripeRouter.getProductInformation.query({
    productId: id,
  });
  const Price = await api.stripeRouter.getPriceInformation.query({
    priceId: Product.default_price as string,
  });
  return <ProductElement product={JSON.stringify(Product)} price={JSON.stringify(Price)} original={original} button="delete" />;
};
async function ServerCheckoutForm() {
  const CookieStore = cookies();

  const ProductData: {
    price: string,
    quantity: number,
  }[] = [];
  const Measurements: {
    pounds: number,
    ounces: number,
    width: number,
    length: number,
    height: number,
    value: number,
  }[] = [];
  let Total: number = 0;

  for (const ProductId of Object.keys(JSON.parse(CookieStore.get("Cart")?.value || "{}"))) {
    const Product = await api.stripeRouter.getProductInformation.query({
      productId: ProductId,
    });
    const Quantity = JSON.parse(CookieStore.get("Cart")!.value)[ProductId];
    ProductData.push({
      price: Product.default_price as string,
      quantity: Quantity,
    });
    const Price = await api.stripeRouter.getPriceInformation.query({
      priceId: Product.default_price as string,
    });
    const UnitAmount = Price.unit_amount!.toString();
    Measurements.push({
      pounds: Product.metadata.Pounds ? parseInt(Product.metadata.Pounds) : 0,
      ounces: Product.metadata.Ounces ? parseInt(Product.metadata.Ounces) : 0,
      width: Product.metadata.Width ? parseInt(Product.metadata.Width) : 0,
      length: Product.metadata.Length ? parseInt(Product.metadata.Length) : 0,
      height: Product.metadata.Height ? parseInt(Product.metadata.Height) : 0,
      value: parseFloat(Price.unit_amount! >= 100 ? UnitAmount.slice(0, UnitAmount.length - 2) + "." + UnitAmount.slice(UnitAmount.length - 2, UnitAmount.length) : "0." + UnitAmount) * Quantity,
    });
    Total += parseFloat(Price.unit_amount! >= 100 ? UnitAmount.slice(0, UnitAmount.length - 2) + "." + UnitAmount.slice(UnitAmount.length - 2, UnitAmount.length) : "0." + UnitAmount) * Quantity;
  };

  return ([<p className="text-2xl text-center" key="subtotal">{`Subtotal: $${Total.toFixed(2)}`}</p>, <CheckoutForm items={ProductData} measurements={Measurements} total={parseFloat(Total.toFixed(2))} key="checkout-form" />]);
};

export default function Page({ searchParams }: {
  searchParams: {
    [Key: string]: string,
  },
}) {
  const CookieStore = cookies();

  if (searchParams?.product) {
    const Cart = JSON.parse(CookieStore.get("Cart")?.value || "{}");
    if (Cart[searchParams.product]) {
      Cart[searchParams.product]++;
    } else {
      Cart[searchParams.product] = 1;
    };
    CookieStore.set("Cart", JSON.stringify(Cart));
  };

  return (
    <main>
      <header className="relative text-center before:absolute before:inset-0 before:bg-cover before:bg-no-repeat before:bg-center before:h-full before:w-full before:-z-[1] before:shop-bg-image before:brightness-50 p-4 min-[300px]:p-12 md:p-24">
        <h1 className="text-5xl min-[410px]:text-7xl">Checkout</h1>
      </header>
      <main className="flex flex-col flex-wrap justify-center p-8 gap-4">
        <Suspense fallback={
          <p className="text-xl">Loading products...</p>
        }>
          {
            CookieStore.get("Cart")?.value && Object.keys(JSON.parse(CookieStore.get("Cart")!.value)).length > 0 ? Object.keys(JSON.parse(CookieStore.get("Cart")!.value)).map(function(Id: string, Index: number) {
              const Quantity = JSON.parse(CookieStore.get("Cart")!.value)[Id];
              if (Index === Object.keys(JSON.parse(CookieStore.get("Cart")!.value)).length - 1) {
                return ([<ServerProductElement id={Id} original={Quantity} key={Id} />, <ServerCheckoutForm key="server-checkout-form" />]);
              };
              return <ServerProductElement id={Id} original={Quantity} key={Id} />;
            }) : <>
              <p className="text-xl mb-2">No products were found in your cart.</p>
              <LinkButton href="/shop" textContent="Go to Shop" />
            </>
          }
        </Suspense>
      </main>
    </main>
  );
};