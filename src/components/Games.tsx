import { motion } from "framer-motion";
import { useMemo } from "react";
import useSWRInfinite from "swr/infinite";
import Game from "./Game";
import LoadingWheel from "./LoadingWheel";
import Space from "./Space";

const Games: React.FC = () => {
  const getApiUrl = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.games) return null;

    if (pageIndex === 0) return "api/history";

    return `api/history?cursor=${previousPageData.nextCursor}`;
  };

  const { data, size, setSize, isValidating } = useSWRInfinite(
    getApiUrl,
    (url) => fetch(url).then((res) => res.json()),
    { initialSize: 1, refreshInterval: 1500 }
  );

  const sortedGames = useMemo(() => {
    if (!data) return [];

    const allGames = data.flatMap((page) => page.games);

    return allGames.sort((a, b) => {
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
              return (
                <motion.div key={game.gameId}>
                  <Game game={game} />
                </motion.div>
              );
            })}
          </div>

          <Space />

          <div className="flex justify-center mb-4">
            <p
              onClick={() => setSize(size + 1)}
              className="text-xs text-center cursor-pointer border px-4 py-4 rounded-xl"
            >
              Load more games
            </p>
          </div>
        </>
      )}

      {isValidating && data && (
        <div className="flex justify-center">
          <LoadingWheel />
        </div>
      )}
    </div>
  );
};

export default Games;
