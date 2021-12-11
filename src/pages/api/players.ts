import redis from "../../redis";

export default async (req, res) => {
  const players = await redis.smembers("players");

  let result = {
    players: null,
    type: null,
    latency: null,
  };

  result.players = players;
  result.type = "redis";
  return res.status(200).json(result);
};
