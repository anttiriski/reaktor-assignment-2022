import { createWebSocket } from "../socket";
import { useEffect } from "react";
import { GameContext } from "../contexts/GameContext";
import { AppProps } from "next/app";
import Layout from "../layouts/Layout";
import Head from "next/head";
import "../styles/index.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const socket = createWebSocket();

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
