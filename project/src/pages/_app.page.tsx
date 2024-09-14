import type { AppProps } from "next/app";
import "@/styles/globals.css";

// TODO - Layout 추가하기

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
