import Link from "next/link";
import LinkButton from "@/components/link-button";
import PageHeader from "@/components/page-header";

export default function NotFound() {
  return (
    <PageHeader className="p-4 min-[300px]:p-12 md:p-24" src="/images/shop.png" alt="Shop background image">
      <h2 className="text-4xl mb-4">Error 404</h2>
      <p className="mb-2">We&apos;re awfully sorry, but it seems like we could not find that page. Please try again later.</p>
      <p className="mb-4">If you think this is a mistake, please <Link href="/contact-us" className="text-yellow-500">contact us</Link> with information about the page you were trying to find. Thank you!</p>
      <LinkButton href="/" textContent="Back To Home Page" />
    </PageHeader>
  );
};