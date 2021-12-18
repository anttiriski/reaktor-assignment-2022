import { NextApiRequest, NextApiResponse } from "next";
import { GameHelper } from "../../utils/GameHelper";
import redis from "../../redis";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { gameId, playerA, playerB } = JSON.parse(req.body);

    const winner = GameHelper.getWinner({
      playerA,
      playerB,
    });

    await Promise.all([
      await redis.rename(`live:${gameId}`, gameId),
      await redis.hset(
        gameId,
        "playerAMove",
        playerA.played,
        "playerBMove",
        playerB.played,
        "timestamp",
        new Date().getTime(), // I think timestamps coming from bad-api do not work properly, so we use this instead
        "winner",
        winner
      ),
      await redis.sadd("games:0", gameId),
      await redis.sadd(`games:${playerA.name}`, gameId),
      await redis.sadd(`games:${playerB.name}`, gameId),
      await redis.srem("games-in-progress", gameId),
    ]);

    res.status(200).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
