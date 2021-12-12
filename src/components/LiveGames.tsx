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

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return open ? (
    <div
      onClick={handleClick}
      className="flex flex-col rounded-2xl fixed right-0 bottom-0 border z-10 bg-white mb-14 mr-4 p-4 pb-10"
    >
      <h1 className="text-3xl font-bold text-center text-rose-500">
        Live Games
      </h1>

      <Space />

      <div className="space-y-3">
        {data?.games.map((game) => {
          return (
            <div className="flex space-x-3">
              <div className="flex grow basis-0 justify-end text-right whitespace-nowrap">
                {game.playerA}
              </div>

              <p className="text-center">vs</p>

              <div className="flex grow basis-0 whitespace-nowrap">
                {game.playerB}
              </div>
            </div>
          );
        })}
      </div>

      <div
        onClick={handleClick}
        className="fixed flex justify-center items-center right-0 bottom-0 mr-4 mb-4 w-20 h-20 rounded-full bg-rose-50 cursor-pointer -z-20"
      >
        <TrophyIcon />
      </div>
    </div>
  ) : (
    <div
      onClick={handleClick}
      className="fixed flex justify-center items-center right-0 bottom-0 mr-4 mb-4 w-20 h-20 rounded-full bg-rose-50 cursor-pointer"
    >
      <TrophyIcon />
    </div>
  );
};

export default LiveGames;
