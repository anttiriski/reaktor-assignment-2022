import { GameType } from "../types/common";
import { formatDistance } from "date-fns";
import { useGameState } from "../contexts/GameContext";

// Components
import PlayerMoveIcon from "./PlayerMoveIcon";

type GameProps = {
  game: GameType;
};

const Game: React.FC<GameProps> = ({ game }) => {
  const { setSelectedPlayer } = useGameState();

  return (
    <div className="flex flex-col space-x-2 border-b pb-4">
      <p className="text-xs text-center mb-2">
        {formatDistance(new Date(Number(game.timestamp)), new Date())} ago
      </p>

      <div className="flex space-x-4">
        <div
          onClick={() => setSelectedPlayer(game.playerA)}
          className={`flex justify-end text-right basis-0 grow md:whitespace-nowrap ${
            game.winner === "draw" || game.winner !== game.playerA
              ? "opacity-50 text-sm"
              : "font-bold"
          }`}
        >
          <p className="cursor-pointer text-sm sm:text-base">{game.playerA}</p>
        </div>

        <div className="flex space-x-2 col-span-1">
          <PlayerMoveIcon move={game.playerAMove} />

          <p>vs</p>

          <PlayerMoveIcon move={game.playerBMove} />
        </div>

        <div
          onClick={() => setSelectedPlayer(game.playerB)}
          className={`flex basis-0 grow md:whitespace-nowrap ${
            game.winner === "draw" || game.winner !== game.playerB
              ? "opacity-50 text-sm"
              : "font-bold"
          }`}
        >
          <p className="cursor-pointer text-sm sm:text-base">{game.playerB}</p>
        </div>
      </div>
    </div>
  );
};

export default Game;
