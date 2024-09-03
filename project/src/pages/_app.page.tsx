import type { AppProps } from "next/app";
import "@/styles/globals.css";

export default (props: AppProps) => {
  return <props.Component {...props.pageProps} />;
};
