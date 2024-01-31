import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#2c2c2c] shadow-[0_0_20px_rgb(0_0_0/70)] p-4">
      <main className="gap-4 flex flex-col flex-wrap md:flex-row md:flex-nowrap justify-center">
        <main className="md:max-w-[50%]">
          <Link href="/">
            <h2 className="text-4xl">Petite Curio Boutique</h2>
          </Link>
          <p>We&apos;re a small business based in Arizona. We spend time scouring the state to procure one of a kind, funky, vintage pieces. We also like to dabble in the handmade arts and make anything from wall decor to our comically morbid tea cups. Feel free to look around and reach out on our contact us page if you have any questions. Cheers!</p>
        </main>
        <nav className="flex flex-col flex-wrap gap-y-2">
          <Link href="/" className="flex items-center gap-1 group max-w-fit">
            <p className="inline-block leading-none relative transition-[filter] duration-300 motion-reduce:duration-0 group-hover:drop-shadow-[0_0_5px_white] group-focus-visible:drop-shadow-[0_0_5px_white] after:w-full after:h-0.5 after:rounded-full after:absolute after:left-0 after:bottom-0 after:bg-white after:scale-x-0 after:transition-transform after:duration-300 motion-reduce:after:duration-0 group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100">Home</p>
          </Link>
          <Link href="/shop" className="flex items-center gap-1 group max-w-fit">
            <p className="inline-block leading-none relative transition-[filter] duration-300 motion-reduce:duration-0 group-hover:drop-shadow-[0_0_5px_white] group-focus-visible:drop-shadow-[0_0_5px_white] after:w-full after:h-0.5 after:rounded-full after:absolute after:left-0 after:bottom-0 after:bg-white after:scale-x-0 after:transition-transform after:duration-300 motion-reduce:after:duration-0 group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100">Shop</p>
          </Link>
          <Link href="/contact-us" className="flex items-center gap-1 group max-w-fit">
            <p className="inline-block leading-none relative transition-[filter] duration-300 motion-reduce:duration-0 group-hover:drop-shadow-[0_0_5px_white] group-focus-visible:drop-shadow-[0_0_5px_white] after:w-full after:h-0.5 after:rounded-full after:absolute after:left-0 after:bottom-0 after:bg-white after:scale-x-0 after:transition-transform after:duration-300 motion-reduce:after:duration-0 group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100">Contact Us</p>
          </Link>
          <Link href="/shop/checkout" className="flex items-center gap-1 group max-w-fit">
            <svg className="inline-block h-5 fill-white" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
              <title>Checkout</title>
              <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
            </svg>
            <p className="inline-block leading-none relative transition-[filter] duration-300 motion-reduce:duration-0 group-hover:drop-shadow-[0_0_5px_white] group-focus-visible:drop-shadow-[0_0_5px_white] after:w-full after:h-0.5 after:rounded-full after:absolute after:left-0 after:bottom-0 after:bg-white after:scale-x-0 after:transition-transform after:duration-300 motion-reduce:after:duration-0 group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100">Checkout</p>
          </Link>
          <a href="https://www.instagram.com/petitecurioboutique/" target="_blank" className="flex items-center gap-1 group max-w-fit">
            <svg className="inline-block h-5 fill-white" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
              <title>Checkout</title>
              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
            </svg>
            <p className="inline-block leading-none relative transition-[filter] duration-300 motion-reduce:duration-0 group-hover:drop-shadow-[0_0_5px_white] group-focus-visible:drop-shadow-[0_0_5px_white] after:w-full after:h-0.5 after:rounded-full after:absolute after:left-0 after:bottom-0 after:bg-white after:scale-x-0 after:transition-transform after:duration-300 motion-reduce:after:duration-0 group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100">Instagram</p>
          </a>
        </nav>
      </main>
      <aside className="mt-2 flex flex-col flex-wrap sm:flex-row sm:flex-nowrap justify-center items-center text-sm divide-y sm:divide-y-0 sm:divide-x text-white/50 divide-white/50" id="#legal">
        <a href="/legal/privacy-policy" className="px-2">Privacy Policy</a>
        <p className="px-2">Copyright &copy; {new Date().getFullYear()} Petite Curio Boutique LLC. All Rights Reserved.</p>
        <a href="/legal/terms-and-conditions" className="px-2">Terms and Conditions</a>
      </aside>
    </footer>
  );
};