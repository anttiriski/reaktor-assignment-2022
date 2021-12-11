import GameIcon from "../icons/GameIcon";
import UserIcon from "../icons/UserIcon";
import Link from "next/link";

const Navigation: React.FC = () => {
  return (
    <div className="flex flex-col px-4 pt-20 border-x space-y-6 items-center">
      <Link href="/">
        <div className="p-2 hover:bg-amber-100 rounded-lg cursor-pointer">
          <GameIcon />
        </div>
      </Link>

      <Link href="/players">
        <div className="p-2 hover:bg-amber-100 rounded-lg cursor-pointer">
          <UserIcon />
        </div>
      </Link>
    </div>
  );
};

export default Navigation;
