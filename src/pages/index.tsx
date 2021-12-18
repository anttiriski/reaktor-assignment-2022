import { useGameState } from "../contexts/GameContext";
import { WorkerApi } from "../workers/comlink.worker";
import { GameHelper } from "../utils/GameHelper";
import redis from "../redis";
import Games from "../components/Games";
import Statistics from "../components/Statistics";
import React, { useEffect } from "react";
import * as Comlink from "comlink";

type Props = {
  cursor: string;
};

const Home: React.FC<Props> = ({ cursor }) => {
  const { setHasInitialized } = useGameState();
  const backgroundWorker = React.useRef<Worker>();
  const backgroundWorkerRef = React.useRef<Comlink.Remote<WorkerApi>>();

  useEffect(() => {
    backgroundWorker.current = new Worker(
      new URL("../workers/comlink.worker", import.meta.url),
      {
        type: "module",
      }
    );

    backgroundWorkerRef.current = Comlink.wrap<WorkerApi>(
      backgroundWorker.current
    );

    // Initialize other games in the background
    setHasInitialized(false);
    backgroundWorkerRef.current?.initializeGames(cursor);

    backgroundWorker.current.onmessage = (event) => {
      if (event.data.value.initialized) {
        setHasInitialized(true);
      }
    };

    return () => {
      backgroundWorker.current?.terminate();
    };
  }, []);

  return (
    <div className="flex h-screen flex-col lg:flex-row-reverse">
      <div className="w-full lg:overflow-auto scrollbar-hide">
        <Statistics />
      </div>

      <div className="w-full lg:overflow-auto scrollbar-hide">
        <Games />
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const res = await fetch("https://bad-api-assignment.reaktor.com/rps/history");

  const { cursor, data } = await res.json();

  // Initialize first games on the server
  data.forEach(async (game) => {
    const { gameId, playerA, playerB } = game;

    const winner = await GameHelper.getWinner({ playerA, playerB });

    await redis.hmset(
      gameId,
      "gameId",
      gameId,
      "timestamp",
      game.t,
      "playerA",
      playerA.name,
      "playerB",
      playerB.name,
      "playerAMove",
      playerA.played,
      "playerBMove",
      playerB.played,
      "winner",
      winner
    );

    await redis.sadd(`games:0`, gameId);
    await redis.sadd(`games:${playerA.name}`, gameId);
    await redis.sadd(`games:${playerB.name}`, gameId);
    await redis.sadd("players", playerA.name, playerB.name);
  });

  return {
    props: { cursor },
  };
}
