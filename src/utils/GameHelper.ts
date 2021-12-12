import redis from "../redis";

export class GameHelper {
  static getWinner({ playerA, playerB }) {
    if (playerA.played === playerB.played) {
      return "draw";
    } else if (
      (playerA.played === "ROCK" && playerB.played === "SCISSORS") ||
      (playerA.played === "SCISSORS" && playerB.played === "PAPER") ||
      (playerA.played === "PAPER" && playerB.played === "ROCK")
    ) {
      return playerA.name;
    } else {
      return playerB.name;
    }
  }

  static async getGames({
    gameHashes,
    prefix,
  }: {
    gameHashes: string[];
    prefix?: string;
  }) {
    const games = await Promise.all(
      gameHashes.map(async (hash) => {
        const hashKey = prefix ? `${prefix}:${hash}` : hash;
        let game = await redis.hgetall(hashKey);
        return game;
      })
    );

    return games;
  }

  static mode = (arr) => {
    return arr
      .sort(
        (a, b) =>
          arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
      )
      .pop();
  };
}
