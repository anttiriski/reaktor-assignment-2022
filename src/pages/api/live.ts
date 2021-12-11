import redis from "../../redis";

export default async (req, res) => {
  let gamesInProgressHashes = await redis.smembers("games-in-progress");

  let gamesInProgress = await Promise.all(
    gamesInProgressHashes.map(async (hash) => {
      let game = await redis.hgetall(`live:${hash}`);
      return game;
    })
  );

  let result = {
    games: null,
    type: null,
    latency: null,
  };

  result.games = gamesInProgress;
  result.type = "redis";
  return res.status(200).json(result);
};
