import { GameHelper } from "../../utils/GameHelper";
import { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const start = Date.now();
    const { cursor } = req.query;

    const hash = `games:${cursor ? cursor : "0"}`;

    const nextCursor = await redis.get(`nextCursor:${cursor ? cursor : "0"}`);

    const gameHashes = await redis.smembers(hash);

    const games = await GameHelper.getGames({
      gameHashes: gameHashes,
    });

    const result = {
      games: null,
      latency: null,
      nextCursor: nextCursor || "0",
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
