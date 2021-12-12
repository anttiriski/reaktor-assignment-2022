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
    <div className="px-8 w-full">
      <h1 className="font-mono text-3xl font-bold text-center text-rose-500">
        Game history
      </h1>

      <Space />

      <div className="space-y-3">
        {data?.games.map((game) => {
          return (
            <div className="flex space-x-2">
              <div className="flex space-x-4 justify-end text-right basis-0 grow">
                <Link href={`/${game.playerA}`}>
                  <p className="cursor-pointer">{game.playerA}</p>
                </Link>
              </div>

              <div className="flex space-x-2 col-span-1">
                <div>
                  <PlayerMove move={game.playerAMove} />
                </div>

                <p>vs</p>

                <div>
                  <PlayerMove move={game.playerBMove} />
                </div>
              </div>

              <div className="flex space-x-4 basis-0 grow">
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
