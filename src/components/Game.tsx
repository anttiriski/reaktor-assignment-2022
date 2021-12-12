import { Game } from "../types/common";

// Components
import Link from "next/link";
import PlayerMove from "./PlayerMove";
import { useGameState } from "../contexts/GameContext";

type GameProps = {
  game: Game;
};

const Game: React.FC<GameProps> = ({ game }) => {
  const { setSelectedPlayer } = useGameState();

  return (
    <div className="flex space-x-2">
      <div
        onClick={() => setSelectedPlayer(game.playerA)}
        className={`flex space-x-4 justify-end text-right basis-0 grow whitespace-nowrap ${
          game.winner === "draw" || game.winner !== game.playerA
            ? "opacity-50 text-sm"
            : "font-bold"
        }`}
      >
        <p className="cursor-pointer">{game.playerA}</p>
      </div>

      <div className="flex space-x-2 col-span-1">
        <PlayerMove move={game.playerAMove} />

        <p>vs</p>

        <PlayerMove move={game.playerBMove} />
      </div>

      <div
        onClick={() => setSelectedPlayer(game.playerB)}
        className={`flex space-x-4 basis-0 grow whitespace-nowrap ${
          game.winner === "draw" || game.winner !== game.playerB
            ? "opacity-50 text-sm"
            : "font-bold"
        }`}
      >
        <p className="cursor-pointer">{game.playerB}</p>
      </div>
    </div>
  );
};

export default Game;
