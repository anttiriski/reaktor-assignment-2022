import redis from "../../redis";

export default async (req, res) => {
  let start = Date.now();
  let gameHashes = await redis.smembers("games");

  let games = await Promise.all(
    gameHashes.map(async (hash) => {
      let game = await redis.hgetall(hash);
      return game;
    })
  );

  let result = {
    games: null,
    type: null,
    latency: null,
  };

  if (gameHashes.length) {
    result.games = games;
    result.type = "redis";
    result.latency = Date.now() - start;
    return res.status(200).json(result);
  } else {
    start = Date.now();
    return fetch("https://bad-api-assignment.reaktor.com/rps/history")
      .then((r) => r.json())
      .then(({ data }) => {
        result.type = "api";
        result.latency = Date.now() - start;
        redis.set("cache", JSON.stringify(data));
        return res.status(200).json(result);
      });
  }
};
