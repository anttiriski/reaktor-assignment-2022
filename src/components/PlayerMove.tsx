import PaperIcon from "../icons/PaperIcon";
import RockIcon from "../icons/RockIcon";
import ScissorsIcon from "../icons/ScissorsIcon";

type PlayerMoveProps = {
  move: "SCISSORS" | "ROCK" | "PAPER";
};

const PlayerMove: React.FC<PlayerMoveProps> = ({ move }) => {
  switch (move) {
    case "SCISSORS":
      return <ScissorsIcon />;

    case "ROCK":
      return <RockIcon />;

    case "PAPER":
      return <PaperIcon />;

    default:
      return <div>Unknown move</div>;
  }
};

export default PlayerMove;
