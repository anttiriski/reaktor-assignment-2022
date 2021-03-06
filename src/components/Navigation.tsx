import { useRouter } from "next/router";
import { useGameState } from "../contexts/GameContext";
import Link from "next/link";
import GameIcon from "../icons/GameIcon";
import UserIcon from "../icons/UserIcon";
import LoadingWheel from "./LoadingWheel";

const Navigation: React.FC = () => {
  const { hasInitialized } = useGameState();
  const router = useRouter();

  return (
    <div className="sm:left-0 sm:h-screen sm:w-20 sm:space-x-0 sm:justify-start sm:pt-20 sm:space-y-6 sm:flex-col justify-center bg-white space-x-4 py-4 z-10 flex px-4 items-center w-full sm:border-x fixed bottom-0 border-t sm:border-t-0">
      <Link href="/">
        <div
          className={`p-2 rounded-lg cursor-pointer ${
            router.pathname === "/" ? "shadow-inner bg-gray-100" : ""
          }`}
        >
          <GameIcon />
        </div>
      </Link>

      <Link href="/players">
        <div
          className={`p-2 rounded-lg cursor-pointer ${
            router.pathname === "/players" ? "shadow-inner bg-gray-100" : ""
          }`}
        >
          <UserIcon />
        </div>
      </Link>

      {!hasInitialized && (
        <div className="flex">
          <div className="has-tooltip">
            <span className="tooltip text-xs bg-white -mt-20 sm:-mt-4 sm:ml-8 text-center border rounded-xl px-4 py-2 min-w-[150px]">
              The player data is loading, please wait...
            </span>

            <LoadingWheel />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;
