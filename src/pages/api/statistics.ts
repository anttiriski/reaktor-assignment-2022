import { GameHelper } from "../../utils/GameHelper";
import { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { player } = req.query;

    if (!player) {
      res.status(200).json({ error: "No player specified" });
      return;
    }

    const gameHashes = await redis.smembers(`games:${player}`);

    if (gameHashes.length === 0) {
      res.status(200).json({ error: "No games found" });
      return;
    }

    const games = await GameHelper.getGames({ gameHashes });

    const gamesWon = games.filter((game) => game.winner === player);

    const playedHands = games.reduce((acc: string[], game) => {
      if (game.playerA === player) {
        return [...acc, game.playerAMove];
      } else {
        return [...acc, game.playerBMove];
      }
    }, []);

    const mostPlayedMove = GameHelper.mode(playedHands);

    const result = {
      allGames: games || [],
      gamesWon,
      mostPlayedMove,
      winPercentage: (gamesWon.length / games.length) * 100,
    };

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
