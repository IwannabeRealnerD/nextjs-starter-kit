import type { AppProps } from "next/app";
import "@/styles/globals.css";

const AppPage = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default AppPage;
