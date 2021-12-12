import redis from "../../redis";

export default async (req, res) => {
  const { gameId, playerA, playerB, timestamp, playerAMove, playerBMove } =
    JSON.parse(req.body);

  // TODO: UPDATE WINNER

  await redis.rename(`live:${gameId}`, gameId);
  await redis.hset(
    gameId,
    "playerAMove",
    playerAMove,
    "playerBMove",
    playerBMove
  );
  await redis.sadd("games", gameId);
  await redis.srem("games-in-progress", gameId);

  res.end();
};
