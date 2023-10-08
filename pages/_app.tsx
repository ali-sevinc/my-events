import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";

import GlobalStyle from "../styles/GlobalStyles";
import { Exo_2 } from "next/font/google";

import Layout from "@/features/layout/Layout";

const inter = Exo_2({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <SessionProvider>
        <main className={`${inter.className}  font-sans`}>
          <Layout>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
            </Head>
            <Component {...pageProps} />
          </Layout>
        </main>
      </SessionProvider>
    </>
  );
}
