import ContactForm from "@/components/contact-form";
import PageHeader from "@/components/page-header";

export default async function Page() {
  return (
    <main>
      <PageHeader src="/images/contact.png" alt="Contact background image">
        <h1 className="text-4xl sm:text-7xl">Contact</h1>
      </PageHeader>
      <main className="p-4">
        <ContactForm />
      </main>
    </main>
  );
};