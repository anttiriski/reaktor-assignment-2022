import { GameHelper } from "../../utils/GameHelper";
import { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { player } = req.query;

    const gameHashes = await redis.smembers("games");

    const games = await GameHelper.getGames({ gameHashes });

    const allGames = games.filter(
      (game) => game.playerA === player || game.playerB === player
    );

    const gamesWon = allGames.filter((game) => game.winner === player);

    const playedHands = allGames.reduce((acc: string[], game) => {
      if (game.playerA === player) {
        return [...acc, game.playerAMove];
      } else {
        return [...acc, game.playerBMove];
      }
    }, []);

    const mostPlayedMove = GameHelper.mode(playedHands);

    const result = {
      allGames,
      gamesWon,
      mostPlayedMove,
      winPercentage: (gamesWon.length / allGames.length) * 100,
    };

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
