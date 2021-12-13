import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import useSWRInfinite from "swr/infinite";
import Game from "./Game";
import LoadingWheel from "./LoadingWheel";
import Space from "./Space";

const Games: React.FC = () => {
  const [cursor, setCursor] = useState(undefined);

  const getKey = (pageIndex, previousPageData) => {
    // reached the end
    if (previousPageData && !previousPageData.games) return null;

    // first page, we don't have `previousPageData`
    if (pageIndex === 0) return "api/history";

    // add the cursor to the API endpoint
    return `api/history?cursor=${previousPageData.nextCursor}`;
  };

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    (url) => fetch(url).then((res) => res.json()),
    { initialSize: 1, refreshInterval: 2000 }
  );

  console.log(data);

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 6);
  const isRefreshing = isValidating && data && data.length === size;

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

          <div className="flex justify-center mb-20">
            <p
              onClick={() => setSize(size + 1)}
              className="text-xs text-center cursor-pointer border px-4 py-4 rounded-xl"
            >
              Load more games
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Games;
