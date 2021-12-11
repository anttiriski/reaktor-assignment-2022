import Link from "next/link";
import useSWR from "swr";
import PlayerMove from "./PlayerMove";
import Space from "./Space";

const Games: React.FC = () => {
  const { data, error } = useSWR(
    "api/history",
    (url) => fetch(url).then((res) => res.json()),
    { refreshInterval: 2000 }
  );

  return (
    <div className="px-8 mt-20">
      <h1 className="font-mono text-3xl">Game history</h1>

      <Space />

      <div>
        {data?.games.map((game) => {
          return (
            <div className="grid grid-cols-3">
              <div className="flex space-x-4">
                <Link href={`/${game.playerA}`}>
                  <p className="cursor-pointer">{game.playerA}</p>
                </Link>
              </div>

              <div className="flex space-x-2">
                <div>
                  <PlayerMove move={game.playerAMove} />
                </div>

                <p>vs</p>

                <div>
                  <PlayerMove move={game.playerBMove} />
                </div>
              </div>

              <div className="flex space-x-4">
                <Link href={`/${game.playerB}`}>
                  <p className="cursor-pointer">{game.playerB}</p>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Games;
