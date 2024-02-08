import PageHeader from "@/components/page-header";

export default async function Page() {
  return (
    <main>
      <PageHeader src="/images/shop.png" alt="Shop background image">
        <h1 className="text-4xl sm:text-7xl">Privacy Policy</h1>
      </PageHeader>
      <main className="flex flex-col flex-wrap justify-center p-8 gap-4">
        <header>
          <p>Last Updated: January 31st, 2024</p>
          <p>Welcome to Petite Curio Boutique! We are committed to protecting the privacy of our users and customers. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase. By using our website, you agree to the terms outlined in this policy.</p>
        </header>
        <section>
          <h2 className="text-3xl">1. Information We Collect</h2>
          <h3 className="text-xl">1.1 Personal Information:</h3>
          <p>When you place an order or contact us, we may collect personal information such as your name, email address, shipping address, and payment details.</p>
          <h3 className="text-xl">1.2 Non-Personal Information:</h3>
          <p>We do not use cookies by default. However, in some cases, we may use essential cookies to enhance your browsing experience, enable certain features, and maintain the security of our website.</p>
        </section>
        <section>
          <h2 className="text-3xl">2. How We Use Your Information</h2>
          <h3 className="text-xl">2.1 Order Processing:</h3>
          <p>We use your personal information to process your orders, communicate with you about your purchase, and provide customer support.</p>
          <h3 className="text-xl">2.2 Improving Our Services:</h3>
          <p>We may analyze non-personal information to improve our website&apos;s functionality, troubleshoot issues, and enhance the user experience.</p>
        </section>
        <section>
          <h2 className="text-3xl">3. Sharing Your Information</h2>
          <h3 className="text-xl">3.1 Third-Party Service Providers:</h3>
          <p>We may share your personal information with trusted third-party service providers such as Stripe to facilitate order fulfillment, payment processing, and other essential functions.</p>
          <h3 className="text-xl">3.2 Legal Compliance:</h3>
          <p>We may disclose your information if required by law or in response to a legal request, such as a court order or government inquiry.</p>
        </section>
        <section>
          <h2 className="text-3xl">4. Your Choices</h2>
          <h3 className="text-xl">4.1 Cookies:</h3>
          <p>We use cookies to store non-personal information, such as products in your cart. You can disable these essential cookies via your browser settings, however, the website may break in functionality in response.</p>
        </section>
        <section>
          <h2 className="text-3xl">5. Security</h2>
          <p>We take reasonable measures to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.</p>
        </section>
        <section>
          <h2 className="text-3xl">6. Changes to this Privacy Policy</h2>
          <p>We reserve the right to update this Privacy Policy at any time. Any changes will be posted on this page with the last updated date.</p>
        </section>
        <footer>
          <h2 className="text-3xl">7. Contact Us</h2>
          <br />
          <p>If you have any questions, concerns, or requests regarding your privacy, please contact us at <a href="mailto:petitecurioboutique@gmail.com" className="text-yellow-500 transition-colors duration-300 hover:text-yellow-600 focus:text-yellow-600">petitecurioboutique@gmail.com</a>.</p>
          <br />
          <p>Thank you for choosing Petite Curio Boutique!</p>
          <p>Petite Curio Boutique LLC</p>
          <p>813 E Marilyn Ave</p>
          <p>Mesa, Arizona, 85204</p>
          <a href="mailto:petitecurioboutique@gmail.com" className="text-yellow-500 transition-colors duration-300 hover:text-yellow-600 focus:text-yellow-600">petitecurioboutique@gmail.com</a>
        </footer>
      </main>
    </main>
  );
};