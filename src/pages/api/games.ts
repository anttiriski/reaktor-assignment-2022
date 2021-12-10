import redis from "../../redis";

export default async (req, res) => {
  const a = await redis.get("begin-game");

  console.log(a);

  res.end();
};
