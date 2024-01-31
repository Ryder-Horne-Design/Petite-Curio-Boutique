export default async function Page() {
  return (
    <main>
      <header className="relative text-center before:absolute before:inset-0 before:bg-cover before:bg-no-repeat before:bg-center before:h-full before:w-full before:-z-[1] before:shop-bg-image before:brightness-50 p-4 min-[300px]:p-12 md:p-24">
        <h1 className="text-7xl">Terms and Conditions</h1>
      </header>
      <main className="flex flex-col flex-wrap justify-center p-8 gap-4">
        <header>
          <p>Last Updated: January 31st, 2024</p>
          <p>Welcome to Petite Curio Boutique! These Terms and Conditions outline the rules and regulations for the use of our website. By accessing or using our website, you agree to comply with and be bound by these terms. If you do not agree with any part of these terms, please do not use our website.</p>
        </header>
        <section>
          <h2 className="text-3xl">1. Use of the Website</h2>
          <h3 className="text-xl">1.1 License:</h3>
          <p>We grant you a limited, non-exclusive, and revocable license to access and use our website for personal or non-commercial purposes.</p>
          <h3 className="text-xl">1.2 Prohibited Activities:</h3>
          <p>You must not misuse the website, including but not limited to engaging in illegal activities, violating others' rights, or attempting to interfere with the functionality of the site.</p>
        </section>
        <section>
          <h2 className="text-3xl">2. Product Information</h2>
          <h3 className="text-xl">2.1 Product Descriptions:</h3>
          <p>We strive to provide accurate and detailed descriptions of our vintage products. However, we do not warrant that product descriptions or other content on the website are error-free.</p>
          <h3 className="text-xl">2.2 Product Availability:</h3>
          <p>Products and prices are subject to change without notice. We reserve the right to discontinue any product at any time.</p>
        </section>
        <section>
          <h2 className="text-3xl">3. Ordering and Payments</h2>
          <h3 className="text-xl">3.1 Order Confirmation:</h3>
          <p>Once you place an order, you will receive an email confirmation. This email does not constitute acceptance of your order; it is a confirmation that we have received it.</p>
          <h3 className="text-xl">3.2 Payment:</h3>
          <p>All payments are processed securely through our payment gateway; Stripe. We accept cards, Affirm (only on purchases of $50 or more), Klarna, and Afterpay / Clearpay. By providing your payment information, you represent and warrant that you have the legal right to use the payment method.</p>
        </section>
        <section>
          <h2 className="text-3xl">4. Shipping and Returns</h2>
          <h3 className="text-xl">4.1 Shipping:</h3>
          <p>We will make reasonable efforts to deliver products in a timely manner. However, we are not responsible for delays beyond our control.</p>
          <h3 className="text-xl">4.2 Returns:</h3>
          <p>Buyer is responsible for return shipping costs and any loss in value if an item isn't returned in original condition. Returns will only be accepted within 30 days of purchase date.</p>
        </section>
        <section>
          <h2 className="text-3xl">5. Privacy</h2>
          <p>By using our website, you agree to the terms outlined in our Privacy Policy. Please review our Privacy Policy for more information on how we collect, use, and protect your personal information.</p>
        </section>
        <section>
          <h2 className="text-3xl">6. Intellectual Property</h2>
          <p>The content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Petite Curio Boutique LLC and is protected by copyright, trademark, and other intellectual property laws.</p>
        </section>
        <section>
          <h2 className="text-3xl">7. Limitation of Liability</h2>
          <p>To the fullest extent permitted by applicable law, Petite Curio Boutique shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.</p>
        </section>
        <section>
          <h2 className="text-3xl">8. Governing Law</h2>
          <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of Maricopa. Any disputes arising from or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in Maricopa.</p>
        </section>
        <section>
          <h2 className="text-3xl">9. Changes to Terms and Conditions</h2>
          <p>We reserve the right to update or modify these Terms and Conditions at any time. Any changes will be effective immediately upon posting on the website.</p>
        </section>
        <footer>
          <h2 className="text-3xl">10. Contact Us</h2>
          <br />
          <p>If you have any questions, concerns, or requests regarding these Terms and Conditions, please contact us at <a href="mailto:petitecurioboutique@gmail.com" className="text-yellow-500 transition-colors duration-300 hover:text-yellow-600 focus:text-yellow-600">petitecurioboutique@gmail.com</a>.</p>
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