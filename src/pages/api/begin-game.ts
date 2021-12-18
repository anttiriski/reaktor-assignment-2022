import { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { gameId, playerA, playerB } = JSON.parse(req.body);

    await redis.sadd("games-in-progress", gameId);

    await redis.hset(
      "live:" + gameId,
      "gameId",
      gameId,
      "playerA",
      playerA.name,
      "playerB",
      playerB.name,
      "timestamp",
      Date.now()
    );

    res.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
