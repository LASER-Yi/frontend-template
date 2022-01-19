import "@/styles/globals.css";
import { AppProps } from "next/app";
import { FunctionComponent } from "react";

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps}></Component>;
};

export default App;
