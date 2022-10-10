import "../styles/globals.css";
import Layout from "../components/layout";
import type { AppProps } from "next/app";
import { UserProvider } from "../hooks/UseUser";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // @ts-ignore
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
