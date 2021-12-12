import { NextApiRequest, NextApiResponse } from "next";
import { GameHelper } from "../../utils/GameHelper";
import redis from "../../redis";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const gameHashes = await redis.smembers("games-in-progress");

    const games = await GameHelper.getGames({ gameHashes, prefix: "live" });

    let result = {
      games: null,
      latency: null,
    };

    result.games = games;
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
