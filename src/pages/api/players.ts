import { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const players = await redis.smembers("players");

    let result = {
      players: null,
    };

    result.players = players;
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
