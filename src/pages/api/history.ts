import redis from "../../redis";

export default async (req, res) => {
  let start = Date.now();
  let cache = await redis.lrange("cache", 0, -1);

  let result = {
    data: null,
    type: null,
    latency: null,
  };

  if (cache) {
    console.log("loading from cache");
    result.data = cache;
    result.type = "redis";
    result.latency = Date.now() - start;
    return res.status(200).json(result);
  } else {
    console.log("loading from api");
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
