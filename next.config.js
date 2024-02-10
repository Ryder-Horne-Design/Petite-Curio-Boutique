/** @type {import("next").NextConfig} */
const Config = {
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
        source: "/checkout",
        destination: "/shop/checkout",
        permanent: true,
      },
      {
        source: "/legal",
        destination: "/#legal",
        permanent: true,
      },
    ];
  },
  env: {
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString(),
  },
  reactStrictMode: true,
};

module.exports = Config;