import { GameHelper } from "../../utils/GameHelper";
import { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const start = Date.now();
    const gameHashes = await redis.smembers("games");

    const games = await GameHelper.getGames({ gameHashes });

    const result = {
      games: null,
      latency: null,
    };

    if (gameHashes.length) {
      result.games = games;
      result.latency = Date.now() - start;
      return res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
  }
};
