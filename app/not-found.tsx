import LinkButton from "@/components/link-button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col flex-wrap justify-center items-center before:absolute before:inset-0 before:bg-cover before:bg-no-repeat before:bg-center before:h-full before:w-full before:-z-[1] before:shop-bg-image before:brightness-50 text-center p-4 min-[300px]:p-12 md:p-24">
      <h2 className="text-4xl mb-4">Error 404</h2>
      <p className="mb-2">We&apos;re awfully sorry, but it seems like we could not find that page. Please try again later.</p>
      <p className="mb-4">If you think this is a mistake, please <Link href="/contact-us" className="text-yellow-500">contact us</Link> with information about the page you were trying to find. Thank you!</p>
      <LinkButton href="/" textContent="Back To Home Page" />
    </main>
  );
};