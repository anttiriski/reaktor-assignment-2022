import redis from "../../redis";

export default async (req, res) => {
  const { gameId, playerA, playerB, t } = JSON.parse(req.body);

  console.log("nyt");

  await redis.rpush("cache", JSON.stringify({ gameId, playerA, playerB }));

  res.end();
};
