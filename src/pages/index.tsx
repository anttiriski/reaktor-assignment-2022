import redis from "../redis";
import Games from "../components/Games";
import Statistics from "../components/Statistics";

const Home: React.FC = () => {
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
  const { data } = await res.json();

  await redis.flushall();

  data.forEach(async (game) => {
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
