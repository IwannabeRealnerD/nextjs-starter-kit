import type { AppProps } from "next/app";
import "@/styles/app.css";

const AppPage = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default AppPage;
