import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const test: any = 3;
  const test1g: any = 3;
  return <Component {...pageProps} />;
}
