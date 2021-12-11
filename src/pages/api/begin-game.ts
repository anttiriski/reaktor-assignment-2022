import redis from "../../redis";

export default async (req, res) => {
  const { gameId, playerA, playerB } = JSON.parse(req.body);

  await redis.sadd("games-in-progress", gameId);

  await redis.hset(
    "live:" + gameId,
    "gameId",
    gameId,
    "playerA",
    playerA.name,
    "playerB",
    playerB.name
  );

  res.end();
};
