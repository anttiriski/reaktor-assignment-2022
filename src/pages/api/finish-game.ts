import redis from "../../redis";

export default async (req, res) => {
  const { gameId, playerA, playerB, timestamp } = JSON.parse(req.body);

  await redis.rename(`live:${gameId}`, gameId);
  await redis.sadd("games", gameId);
  await redis.srem("games-in-progress", gameId);

  res.end();
};
