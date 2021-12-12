import redis from "../redis";
import Games from "../components/Games";
import Statistics from "../components/Statistics";

const Home: React.FC = () => {
  return (
    <div className="flex">
      <div className="mt-12 w-full">
        <Games />
      </div>

      <div className="sticky top-0 h-full w-full">
        <Statistics />
      </div>
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
    const playerAMove = playerA.played;
    const playerBMove = playerB.played;

    if (playerAMove === playerBMove) {
      await redis.hset(gameId, "winner", "draw");
    } else if (
      (playerAMove === "ROCK" && playerBMove === "SCISSORS") ||
      (playerAMove === "SCISSORS" && playerBMove === "PAPER") ||
      (playerAMove === "PAPER" && playerBMove === "ROCK")
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
      game.playerB.name,
      "playerAMove",
      playerAMove,
      "playerBMove",
      playerBMove
    );

    await redis.sadd("games", game.gameId);

    await redis.sadd("players", game.playerA.name);
    await redis.sadd("players", game.playerB.name);
  });

  return {
    props: {},
  };
}
