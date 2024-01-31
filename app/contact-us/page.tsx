import ContactForm from "@/components/contact-form";

export default async function Page() {
  return (
    <main>
      <header className="relative text-center before:absolute before:inset-0 before:bg-cover before:bg-no-repeat before:bg-center before:h-full before:w-full before:-z-[1] before:shop-bg-image before:brightness-50 p-4 min-[300px]:p-12 md:p-24">
        <h1 className="text-7xl">Shop</h1>
      </header>
      <main className="p-4">
        <ContactForm />
      </main>
    </main>
  );
};