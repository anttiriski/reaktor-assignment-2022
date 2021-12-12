import GameIcon from "../icons/GameIcon";
import UserIcon from "../icons/UserIcon";
import Link from "next/link";
import { useRouter } from "next/router";

const Navigation: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col px-4 pt-20 space-y-6 items-center w-full">
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
    </div>
  );
};

export default Navigation;
