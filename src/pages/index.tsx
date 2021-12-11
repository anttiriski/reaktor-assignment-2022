import useSWR from "swr";
import LiveGames from "../components/LiveGames";
import redis from "../redis";

const Home = () => {
  const { data, error } = useSWR(
    "api/history",
    (url) => fetch(url).then((res) => res.json()),
    { refreshInterval: 2000 }
  );

  return (
    <div className="flex flex-col items-center p-4 mx-auto min-h-screen justify-center">
      <LiveGames />

      <main>
        <h1 className="font-mono text-xl code">
          Welcome to <span className="text-purple-700">Nextjs</span>,{" "}
          <span className="text-indigo-700">TailwindCSS</span> and{" "}
          <span className="text-gray-700">TypeScript</span>
        </h1>
        {data?.games.map((game) => {
          return (
            <>
              <div>{game.gameId}:</div>
              <div>{game.playerA}</div>
              <div>{game.playerB}</div>
            </>
          );
        })}
      </main>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const res = await fetch("https://bad-api-assignment.reaktor.com/rps/history");
  const { data } = await res.json();

  await redis.flushall();

  const sortedByTime = data.sort((a, b) => {
    const aTime = new Date(a.t).getTime();
    const bTime = new Date(b.t).getTime();
    return bTime - aTime;
  });

  sortedByTime.forEach(async (game) => {
    const { gameId, playerA, playerB } = game;
    const player1Move = playerA.played;
    const player2Move = playerB.played;

    if (player1Move === player2Move) {
      await redis.hset(gameId, "winner", "draw");
    } else if (
      (player1Move === "rock" && player2Move === "scissors") ||
      (player1Move === "scissors" && player2Move === "paper") ||
      (player1Move === "paper" && player2Move === "rock")
    ) {
      await redis.hset(gameId, "winner", playerA.name);
    } else {
      await redis.hset(gameId, "winner", playerB.name);
    }

    await redis.hmset(
      game.gameId,
      "gameId",
      game.gameId,
      "timestamp",
      game.t,
      "playerA",
      game.playerA.name,
      "playerB",
      game.playerB.name
    );

    await redis.sadd("games", game.gameId);
  });

  return {
    props: {},
  };
}
