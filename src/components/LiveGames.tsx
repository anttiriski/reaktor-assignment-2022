import { differenceInSeconds } from "date-fns";
import { motion } from "framer-motion";
import { useState } from "react";
import useSWR from "swr";
import TrophyIcon from "../icons/TrophyIcon";
import Space from "./Space";

const LiveGames = () => {
  const { data, error } = useSWR(
    "api/live",
    (url) => fetch(url).then((res) => res.json()),
    { refreshInterval: 1500 }
  );

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="fixed z-20 flex justify-center items-center right-0 bottom-0 mr-4 mb-2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border cursor-pointer"
      >
        <TrophyIcon />
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: 250 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col rounded-2xl fixed right-0 bottom-0 border z-10 bg-white mb-20 sm:mb-28 mx-4 p-4 shadow"
        >
          <h1 className="text-3xl font-bold text-center text-gradient">
            Live Games
          </h1>

          <Space />

          {error ? (
            <p className="px-4">There was an error</p>
          ) : (
            <div className="space-y-3 max-h-64 sm:max-h-96 overflow-y-scroll overscroll-contain scrollbar-hide">
              {data?.games.length ? (
                data.games.map((game, index) => {
                  return (
                    <div
                      className="flex flex-col border-b last:border-b-0 py-2"
                      key={index}
                    >
                      <div className="text-center text-xs mb-2">
                        {differenceInSeconds(
                          Date.now(),
                          new Date(Number(game.timestamp))
                        )}{" "}
                        seconds ago
                      </div>
                      <div className="flex space-x-3">
                        <div className="flex grow basis-0 justify-end text-right md:whitespace-nowrap text-sm sm:text-base">
                          {game.playerA}
                        </div>

                        <p className="text-center">vs</p>

                        <div className="flex grow basis-0 md:whitespace-nowrap text-sm sm:text-base">
                          {game.playerB}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No games are currently live.</p>
              )}
            </div>
          )}
        </motion.div>
      )}
    </>
  );
};

export default LiveGames;
