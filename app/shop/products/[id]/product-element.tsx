"use client";
import Button from "@/components/button";
import LinkButton from "@/components/link-button";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import Link from "next/link";
import { type MouseEvent, createRef, useState } from "react";
import { createRoot } from "react-dom/client";

export default function ProductElement({id, name, description, active, stock, image0}: {
  id: string,
  name: string,
  description: string,
  active: boolean,
  stock: string,
  image0: string,
}) {
  const CookieStore = useCookies();

  const InfoRef = createRef<HTMLParagraphElement>();

  const [Amount, SetAmount] = useState(1);

  function ExpandImage(Event?: MouseEvent<HTMLButtonElement>) {
    if (Event?.currentTarget) {
      const Button = Event!.currentTarget;
      if (Button.childElementCount === 1) {
        const ButtonImage: HTMLImageElement = Button.children[0] as HTMLImageElement;
        const Expanded = document.createElement("div");
        Expanded.className = "z-50 fixed w-full h-full bg-black/75 flex flex-col flex-wrap justify-center items-center transition-opacity duration-300 opacity-0";
        const ExpandedRoot = createRoot(Expanded);
        ExpandedRoot.render(
          <>
            <button type="button" className="absolute top-0 right-0 mr-2 w-max h-max" onClick={function() {
              Expanded.classList.add("opacity-0");
              Expanded.classList.remove("opacity-100");
              setTimeout(function() {
                Expanded.remove();
              }, 300);
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" height="3rem" viewBox="0 0 384 512" className="fill-white">
                <title>X Icon</title>
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
              </svg>
              <p className="sr-only">Close</p>
            </button>
            <img srcSet={ButtonImage.srcset} src={ButtonImage.src} alt={ButtonImage.alt} width={ButtonImage.width} height={ButtonImage.height} className="h-[75vw] sm:h-[50vw] max-h-[90%] w-auto"></img>
            <p className="text-white text-xl text-center w-3/4 sm:w-1/2">{ButtonImage.alt}</p>
          </>
        );
        document.body.appendChild(Expanded);
        setTimeout(function() {
          Expanded.classList.add("opacity-100");
          Expanded.classList.remove("opacity-0");
        });
      };
    };
  };
  function DecreaseAmount(Event?: MouseEvent<HTMLButtonElement>) {
    if (Event?.currentTarget) {
      InfoRef.current!.classList.add("hidden");
      InfoRef.current!.classList.remove("text-red-500", "text-green-500", "text-yellow-500");
      if (Amount > 1) {
        SetAmount(Amount - 1);
      } else {
        InfoRef.current!.innerText = "Cannot have less than 1 of one item.";
        InfoRef.current!.classList.add("text-red-500");
        InfoRef.current!.classList.remove("hidden");
      };
    };
  };
  function IncreaseAmount(Event?: MouseEvent<HTMLButtonElement>) {
    if (Event?.currentTarget) {
      InfoRef.current!.classList.add("hidden");
      InfoRef.current!.classList.remove("text-red-500", "text-green-500", "text-yellow-500");
      const Cart = JSON.parse(CookieStore.get("Cart") || "{}");
      const TrueAmount = Amount + (Cart[id] || 0);
      if (TrueAmount < 99 && TrueAmount < stock) {
        SetAmount(Amount + 1);
      } else {
        InfoRef.current!.innerText = "Cannot have more than 99 or more than the available stock of one item.";
        InfoRef.current!.classList.add("text-red-500");
        InfoRef.current!.classList.remove("hidden");
      };
    };
  };
  
  if (active) {
    return (
      <main>
        <header className="relative text-center before:absolute before:inset-0 before:bg-cover before:bg-no-repeat before:bg-center before:h-full before:w-full before:-z-[1] before:shop-bg-image before:brightness-50 p-4 min-[300px]:p-12 md:p-24">
          <h1 className="text-7xl">Shop</h1>
        </header>
        <main className="px-4 py-4 md:px-20 md:py-10 flex flex-col flex-wrap md:flex-row md:flex-nowrap justify-center items-center gap-x-12">
          <button className="w-3/4 md:w-1/2 h-full" onClick={ExpandImage}>
            <Image src={image0} alt={`Image of ${name}`} width={640} height={640} className="rounded-2xl object-cover w-full h-full" priority></Image>
          </button>
          <main className="flex flex-col flex-wrap justify-center gap-y-2 w-full text-center md:text-start md:w-1/2">
            <h2 className="text-4xl">{name}</h2>
            <p>{description}</p>
            <div className="flex flex-nowrap justify-center md:justify-start">
              <button type="button" className="px-4 py-1 border-white border rounded-l-full" onClick={DecreaseAmount}>-</button>
              <p className="px-4 py-1 border-white border">{Amount.toString()}</p>
              <button type="button" className="px-4 py-1 border-white border rounded-r-full" onClick={IncreaseAmount}>+</button>
            </div>
            {parseInt(stock) <= 3 ? <p className="text-red-600">{`${stock} in stock`}</p> : ""}
            <Button onClick={function() {
              InfoRef.current!.classList.add("hidden");
              InfoRef.current!.classList.remove("text-green-600", "text-red-600");
              const Cart = JSON.parse(CookieStore.get("Cart") || "{}");
              const TrueAmount = Amount + (Cart[id] || 0);
              if (TrueAmount > 0 && TrueAmount < 100 && TrueAmount <= stock) {
                Cart[id] = TrueAmount;
                CookieStore.set("Cart", JSON.stringify(Cart));
                InfoRef.current!.innerText = "Item successfully added to cart!";
                InfoRef.current!.classList.add("text-green-600");
                InfoRef.current!.classList.remove("hidden");
              } else {
                InfoRef.current!.innerText = "Cannot have less than 1 or more than 99 or the available stock of one item in your cart.";
                InfoRef.current!.classList.add("text-red-600");
                InfoRef.current!.classList.remove("hidden");      
              };  
            }} textContent="Add to Cart" />
            <p className="hidden" ref={InfoRef}></p>
          </main>
        </main>
      </main>
    );  
  } else {
    return (
      <main className="flex flex-col flex-wrap justify-center items-center before:absolute before:inset-0 before:bg-cover before:bg-no-repeat before:bg-center before:h-full before:w-full before:-z-[1] before:shop-bg-image before:brightness-50 text-center p-4 min-[300px]:p-12 md:p-24">
        <h2 className="text-4xl mb-4">Product Not Found</h2>
        <p className="mb-2">We&apos;re awfully sorry, but it seems like we could not find that product. Please try again later.</p>
        <p className="mb-4">If you think this is a mistake, please <Link href="/contact-us" className="text-yellow-500">contact us</Link> with information about the product you were trying to find. Thank you!</p>
        <LinkButton href="/shop" textContent="Back To Shop" />
      </main>
    );
  };
}