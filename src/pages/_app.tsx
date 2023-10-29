import { type AppType } from "next/dist/shared/lib/utils";
import "@/styles/globals.css";
import Layout from "@/components/Layout/Layout";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
