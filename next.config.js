/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.stripe.com",
        port: "",
        pathname: "/links/**",
      },
    ],
  },
  i18n: {
    locales: ["en", /*"fr"*/],
    defaultLocale: "en",
  },
  async redirects() {
    return [
      {
        source: "/shop",
        has: [
          {
            type: "query",
            key: "product",
            value: "(?<product>.*)",
          },
        ],
        destination: "/shop/products/:product",
        permanent: true,
      },
      {
        source: "/shop/products",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/legal",
        destination: "/#legal",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig
