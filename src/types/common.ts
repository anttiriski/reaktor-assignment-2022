export type GameMove = "ROCK" | "PAPER" | "SCISSORS";

export type GameType = {
  gameId: string;
  playerA: string;
  playerB: string;
  playerAMove: GameMove;
  playerBMove: GameMove;
  timestamp: number;
  winner: string;
};
