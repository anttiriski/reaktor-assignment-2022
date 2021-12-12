import redis from "../redis";
import Games from "../components/Games";
import Statistics from "../components/Statistics";
import { GameHelper } from "../utils/GameHelper";

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

    await redis.sadd("games", gameId);
    await redis.sadd("players", playerA.name);
    await redis.sadd("players", playerB.name);
  });

  return {
    props: {},
  };
}
