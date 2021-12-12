export type GameMove = "ROCK" | "PAPER" | "SCISSORS";

export type Game = {
  gameId: string;
  playerA: string;
  playerB: string;
  playerAMove: GameMove;
  playerBMove: GameMove;
  timestamp: number;
  winner: string;
};
