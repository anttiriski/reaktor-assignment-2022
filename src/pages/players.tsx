import { useGameState } from "../contexts/GameContext";
import useSWR from "swr";
import LoadingWheel from "../components/LoadingWheel";
import Space from "../components/Space";
import Link from "next/link";
import UserIcon from "../icons/UserIcon";

const PlayersPage: React.FC = () => {
  const { setSelectedPlayer } = useGameState();

  const { data, error } = useSWR("api/players", (url) =>
    fetch(url).then((res) => res.json())
  );

  const handleClick = (player) => {
    setSelectedPlayer(player);
  };

  return (
    <div className="flex flex-col pt-12 sm:ml-20 px-8">
      <h1 className="text-3xl font-bold text-gradient">Players</h1>

      <Space />

      <div className="flex flex-wrap gap-4">
        {!data ? (
          <LoadingWheel />
        ) : (
          data.players.map((player) => {
            return (
              <Link href="/">
                <div
                  onClick={() => handleClick(player)}
                  className="border rounded-xl px-4 py-2 cursor-pointer flex items-center"
                >
                  <UserIcon className="text-gray-300 fill-current w-6 h-6 mr-2" />

                  <p>{player}</p>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PlayersPage;
