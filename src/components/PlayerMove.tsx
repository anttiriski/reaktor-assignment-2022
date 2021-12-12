import PaperIcon from "../icons/PaperIcon";
import RockIcon from "../icons/RockIcon";
import ScissorsIcon from "../icons/ScissorsIcon";

type PlayerMoveProps = {
  move: "SCISSORS" | "ROCK" | "PAPER";
};

const PlayerMove: React.FC<PlayerMoveProps> = ({ move }) => {
  switch (move) {
    case "SCISSORS":
      return (
        <div>
          <ScissorsIcon />
        </div>
      );

    case "ROCK":
      return (
        <div>
          <RockIcon />
        </div>
      );

    case "PAPER":
      return (
        <div>
          <PaperIcon />
        </div>
      );

    default:
      return <div>Unknown move</div>;
  }
};

export default PlayerMove;
