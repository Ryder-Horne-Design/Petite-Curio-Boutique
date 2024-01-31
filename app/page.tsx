import LinkButton from "@/components/link-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <header className="relative before:absolute before:inset-0 before:bg-cover before:bg-no-repeat before:bg-center before:h-full before:w-full before:-z-[1] before:shop-bg-image before:brightness-50 p-4 min-[300px]:p-12 md:p-24">
        <h1 className="text-4xl mb-2">Home of Nostalgia</h1>
        <p className="text-xl mb-4">Selling vintage pieces that send you back to your childhood & fond memories of yesteryear. Occasionally making things that fit my fancy.</p>
        <LinkButton href="/shop" textContent="Shop Now" />
      </header>
      <section className="p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">About Us</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row flex-wrap sm:flex-nowrap gap-4 justify-center">
            <Image src="/images/author.jpeg" alt="Picture of the owner of Petite Curio Boutique, Lucia Williams, at the beach" width={1125} height={1125} sizes="(min-width: 640px) 40vw, 80vw" className="rounded-xl max-h-[50%]" />
            <main>
              <h3 className="text-2xl">Who are We?</h3>
              <p>We&apos;re a small business based in Arizona. We spend time scouring the state to procure one of a kind, funky, vintage pieces. We also like to dabble in the handmade arts and make anything from wall decor to our comically morbid tea cups. Feel free to look around and reach out on our contact us page if you have any questions. Cheers!</p>
            </main>
          </CardContent>
        </Card>
      </section>
      <section className="relative before:absolute before:inset-0 before:bg-cover before:bg-no-repeat before:bg-center before:h-full before:w-full before:-z-[1] before:contact-bg-image before:brightness-50 p-4 min-[300px]:p-12 md:p-24">
        <h2 className="text-4xl mb-2">What if I need to contact you?</h2>
        <p className="text-xl mb-2">If you ever need to contact us for any reason, whether you have a question about our business or have feedback about one (or multiple!) of our items, do not fret!</p>
        <p className="text-xl mb-4">You can easily contact us using our contact us page.</p>
        <LinkButton href="/contact-us" textContent="Contact Us" />
      </section>
      <footer className="p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">So, what are you waiting for?</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row flex-wrap sm:flex-nowrap gap-4 justify-center">
            <Image src="/images/shop.png" alt="Woman walking through mysterious dark shop" width={512} height={512} sizes="(min-width: 640px) 40vw, 80vw" className="rounded-xl max-h-[50%]" />
            <main>
              <p className="mb-4">Look through our vintage products now, before they run out!</p>
              <LinkButton href="/shop" textContent="Shop Now" />
            </main>
          </CardContent>
        </Card>
      </footer>
    </main>
  );
};