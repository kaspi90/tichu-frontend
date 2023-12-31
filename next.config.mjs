/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/public/**",
      },
      {
        protocol: "https",
        hostname: "tichu-counter.onrender.com",
        port: "",
        pathname: "/public/**",
      },
      {
        protocol: "http",
        hostname: "tichu-counter.onrender.com",
        port: "",
        pathname: "/public/**",
      },
    ],
  },
};

export default config;
