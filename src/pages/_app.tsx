import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default (props: AppProps) => {
  return <props.Component {...props.pageProps} />;
};
