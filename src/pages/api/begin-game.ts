import redis from "../../redis";

export default async (req, res) => {
  const { gameId, playerA, playerB } = JSON.parse(req.body);

  await redis.set("begin-game", JSON.stringify({ playerA, playerB }));

  res.end();
};
