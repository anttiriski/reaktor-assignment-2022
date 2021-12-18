import { GameHelper } from "../../utils/GameHelper";
import { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis";

async function getGames(nextCursor): Promise<String> {
  return new Promise(async (resolve, reject) => {
    const url = nextCursor
      ? `https://bad-api-assignment.reaktor.com/rps/history?cursor=${nextCursor}`
      : `https://bad-api-assignment.reaktor.com/rps/history`;

    const res = await fetch(url);

    const { cursor, data } = await res.json();

    data.forEach(async (game) => {
      const { gameId, playerA, playerB } = game;

      const winner = await GameHelper.getWinner({ playerA, playerB });

      await redis.hmset(
        gameId,
        "gameId",
        gameId,
        "timestamp",
        game.t,
        "playerA",
        playerA.name,
        "playerB",
        playerB.name,
        "playerAMove",
        playerA.played,
        "playerBMove",
        playerB.played,
        "winner",
        winner
      );

      await redis.sadd(`games:${nextCursor}`, gameId);
      await redis.sadd(`games:${playerA.name}`, gameId);
      await redis.sadd(`games:${playerB.name}`, gameId);
      await redis.sadd("players", playerA.name);
      await redis.sadd("players", playerB.name);
    });

    if (cursor) {
      const parsedCursor = cursor.match(/=(.*)/)[1];
      await redis.set(
        `nextCursor:${nextCursor ? nextCursor : "0"}`,
        parsedCursor
      );
      resolve(parsedCursor);
    }
  });
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const timeToRefresh = await redis.ttl("refresh");

  if (timeToRefresh > 0) {
    return res.status(200).json({
      message: "Successfully initialized",
      initialized: true,
    });
  }

  await redis.flushall();
  await redis.set("refresh", "true");
  await redis.expire("refresh", 60 * 15); // 15 minutes

  let { cursor } = req.body;

  let nextCursor = null;
  let hasNextCursor = true;

  while (hasNextCursor) {
    const cursorWithPath = await getGames(nextCursor);

    if (cursorWithPath) {
      nextCursor = cursorWithPath;
    }

    hasNextCursor = cursor !== null;
  }

  return res.status(200).json({
    message: "Successfully initialized",
    initialized: true,
  });
};
