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

  const sortedGames = useMemo(() => {
    if (!data) return [];

    return data.games.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
  }, [data]);

  return (
    <div className="px-4 lg:px-8 w-full mb-20 mt-12 lg:max-w-full max-w-2xl mx-auto">
      <h1 className="font-mono text-3xl font-bold text-center text-gradient">
        Game history
      </h1>

      <Space />

      {!data ? (
        <div className="flex justify-center">
          <LoadingWheel />
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {sortedGames?.map((game) => {
              return <Game game={game} />;
            })}
          </div>

          <Space />

          <p className="text-xs text-center pb-20">No more games...</p>
        </>
      )}
    </div>
  );
};

export default Games;
