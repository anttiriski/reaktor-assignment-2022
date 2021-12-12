import { useState } from "react";
import useSWR from "swr";
import TrophyIcon from "../icons/TrophyIcon";
import Space from "./Space";

const LiveGames = () => {
  const { data, error } = useSWR(
    "api/live",
    (url) => fetch(url).then((res) => res.json()),
    { refreshInterval: 2000 }
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
        <div className="flex flex-col rounded-2xl fixed right-0 bottom-0 border z-10 bg-white mb-20 sm:mb-28 mx-4 p-4 pb-10 shadow">
          <h1 className="text-3xl font-bold text-center text-gradient">
            Live Games
          </h1>

          <Space />

          <div className="space-y-3">
            {data?.games.length ? (
              data?.games.map((game) => {
                return (
                  <div className="flex space-x-3">
                    <div className="flex grow basis-0 justify-end text-right md:whitespace-nowrap text-sm sm:text-base">
                      {game.playerA}
                    </div>

                    <p className="text-center">vs</p>

                    <div className="flex grow basis-0 md:whitespace-nowrap text-sm sm:text-base">
                      {game.playerB}
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No games are currently live.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LiveGames;
