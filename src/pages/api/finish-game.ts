import { NextApiRequest, NextApiResponse } from "next";
import { GameHelper } from "../../utils/GameHelper";
import redis from "../../redis";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { gameId, playerA, playerB, timestamp, playerAMove, playerBMove } =
      JSON.parse(req.body);

    const winner = GameHelper.getWinner({
      playerA,
      playerB,
    });

    await redis.rename(`live:${gameId}`, gameId);
    await redis.hset(
      gameId,
      "playerAMove",
      playerAMove,
      "playerBMove",
      playerBMove,
      "timestamp",
      new Date().getTime(), // Timestamp coming from bad-api doesn't work properly, so we use this instead
      "winner",
      winner
    );

    await redis.sadd("games", gameId);
    await redis.srem("games-in-progress", gameId);

    res.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
