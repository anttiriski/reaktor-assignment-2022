import { useMemo } from "react";
import useSWR from "swr";
import Game from "./Game";
import LoadingWheel from "./LoadingWheel";
import Space from "./Space";

const Games: React.FC = () => {
  const { data, error } = useSWR(
    "api/history",
    (url) => fetch(url).then((res) => res.json()),
    { refreshInterval: 2000 }
  );

  // Sort games by timestamp

  const sortedGames = useMemo(() => {
    if (!data) return [];

    return data.games.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
  }, [data]);

  return (
    <div className="px-12 w-full">
      <h1 className="font-mono text-3xl font-bold text-center">Game history</h1>

      <Space />

      {!data ? (
        <div className="flex justify-center">
          <LoadingWheel />
        </div>
      ) : (
        <div className="space-y-3">
          {sortedGames?.map((game) => {
            return <Game game={game} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Games;
