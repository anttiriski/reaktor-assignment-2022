import Head from "next/head";
import { AppProps } from "next/app";
import "../styles/index.css";
import { createWebsocket } from "../socket";
import { useEffect } from "react";
import { GameContext } from "../contexts/GameContext";
import Layout from "../components/Layout";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const socket = createWebsocket();

    return () => socket.close();
  }, []);

  return (
    <>
      <Head>
        <title>Rock paper scissors</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <GameContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GameContext>
    </>
  );
};

export default MyApp;
