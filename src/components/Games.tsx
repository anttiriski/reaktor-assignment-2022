import { AnimatePresence, motion } from "framer-motion";
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.025,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

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
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            {sortedGames?.map((game) => {
              return (
                <motion.div key={game.gameId} variants={item}>
                  <Game game={game} />
                </motion.div>
              );
            })}
          </motion.div>

          <Space />

          <p className="text-xs text-center pb-20">No more games...</p>
        </>
      )}
    </div>
  );
};

export default Games;
