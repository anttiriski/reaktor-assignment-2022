import { Game } from "../types/common";

// Components
import Link from "next/link";
import PlayerMove from "./PlayerMove";

type GameProps = {
  game: Game;
};

const Game: React.FC<GameProps> = ({ game }) => {
  return (
    <div className="flex space-x-2">
      <div
        className={`flex space-x-4 justify-end text-right basis-0 grow whitespace-nowrap ${
          game.winner === "draw" || game.winner !== game.playerA
            ? "opacity-50 text-sm"
            : "font-bold"
        }`}
      >
        <Link href={`/${game.playerA}`}>
          <p className="cursor-pointer">{game.playerA}</p>
        </Link>
      </div>

      <div className="flex space-x-2 col-span-1">
        <PlayerMove move={game.playerAMove} />

        <p>vs</p>

        <PlayerMove move={game.playerBMove} />
      </div>

      <div
        className={`flex space-x-4 basis-0 grow whitespace-nowrap ${
          game.winner === "draw" || game.winner !== game.playerB
            ? "opacity-50 text-sm"
            : "font-bold"
        }`}
      >
        <Link href={`/${game.playerB}`}>
          <p className="cursor-pointer">{game.playerB}</p>
        </Link>
      </div>
    </div>
  );
};

export default Game;
