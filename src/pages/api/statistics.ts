import redis from "../../redis";

export default async (req, res) => {
  const { player } = req.query;

  const gameHashes = await redis.smembers("games");

  const games = await Promise.all(
    gameHashes.map(async (hash) => {
      let game = await redis.hgetall(hash);
      return game;
    })
  );

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

  const mode = (arr) => {
    return arr
      .sort(
        (a, b) =>
          arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
      )
      .pop();
  };

  const mostPlayedMove = mode(playedHands);

  const result = {
    allGames,
    gamesWon,
    mostPlayedMove,
    winProsentage: (gamesWon.length / allGames.length) * 100,
  };

  return res.status(200).json(result);
};
