"use client";
import Link from "next/link";
import { createRef } from "react";

function HeaderLink({ href, linkChildren, onClick, children }: {
  href: string,
  linkChildren?: React.ReactNode,
  onClick?: React.MouseEventHandler<HTMLAnchorElement>,
  children: React.ReactNode,
}) {
  return (
    <Link href={href} className="flex justify-center items-center gap-1 group px-2" onClick={onClick}>
      {linkChildren}
      <p className="inline-block leading-none relative transition-[text-shadow] duration-300 motion-reduce:duration-0 group-hover:[text-shadow:0_0_5px_white] group-focus-visible:[text-shadow:0_0_5px_white] after:w-full after:h-0.5 after:rounded-full after:absolute after:left-0 after:bottom-0 after:bg-white after:scale-x-0 after:transition-transform after:duration-300 motion-reduce:after:duration-0 group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100">
        {children}
      </p>
    </Link>
  );
};

export default function Header() {
  const NavRef = createRef<HTMLElement>();

  return (
    <header className="bg-[#2c2c2c] sticky top-0 shadow-[0_0_20px_rgb(0_0_0/70)] p-4 flex flex-col flex-wrap gap-y-2 z-50">
      <Link href="/" className="inline-block text-center mx-auto">
        <h2 className="text-4xl">Petite Curio Boutique</h2>
      </Link>
      <nav className="hidden sm:flex justify-center items-center divide-x">
        <HeaderLink href="/">Home</HeaderLink>
        <HeaderLink href="/shop">Shop</HeaderLink>
        <HeaderLink href="/contact-us">Contact Us</HeaderLink>
        <HeaderLink href="/checkout" linkChildren={
          <svg className="inline-block h-5 fill-white" role="presentation" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
            <title>Checkout</title>
            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
          </svg>        
        }>Checkout</HeaderLink>
      </nav>
      <button className="flex sm:hidden justify-center items-center gap-1 text-center fill-white text-white" onClick={function() {
        if (NavRef.current) {
          NavRef.current.classList.remove("translate-x-full");
        };
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" role="presentation" height="16" width="14" viewBox="0 0 448 512">
          <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
        </svg>
        <p className="inline-block leading-none">Menu</p>
      </button>
      <nav ref={NavRef} className="bg-[#2c2c2c] text-3xl translate-x-full transition-transform duration-300 fixed inset-0 flex flex-col flex-wrap sm:hidden justify-center items-center gap-2 z-50">
        <button className="absolute top-0 right-0 mr-4 my-2 text-center" onClick={function() {
          if (NavRef.current) {
            NavRef.current.classList.add("translate-x-full");
          };
        }}>X</button>
        <HeaderLink href="/" onClick={function() {
          if (NavRef.current) {
            NavRef.current.classList.add("translate-x-full");
          };
        }}>Home</HeaderLink>
        <HeaderLink href="/shop" onClick={function() {
          if (NavRef.current) {
            NavRef.current.classList.add("translate-x-full");
          };
        }}>Shop</HeaderLink>
        <HeaderLink href="/contact-us" onClick={function() {
          if (NavRef.current) {
            NavRef.current.classList.add("translate-x-full");
          };
        }}>Contact Us</HeaderLink>
        <HeaderLink href="/shop/checkout" linkChildren={
          <svg className="inline-block h-5 fill-white" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
            <title>Checkout</title>
            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
          </svg>        
        } onClick={function() {
          if (NavRef.current) {
            NavRef.current.classList.add("translate-x-full");
          };
        }}>Checkout</HeaderLink>
      </nav>
    </header>
  );
};