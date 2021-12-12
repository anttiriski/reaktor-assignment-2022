import { useGameState } from "../contexts/GameContext";
import useSWR from "swr";
import Game from "./Game";
import Space from "./Space";
import { useMemo } from "react";

const Statistics: React.FC = ({}) => {
  const { selectedPlayer } = useGameState();

  const { data, error } = useSWR(
    `/api/statistics?player=${selectedPlayer}`,
    (url) => fetch(url).then((res) => res.json()),
    { refreshInterval: 2000 }
  );

  const sortedGames = useMemo(() => {
    if (!data) return [];

    return data.allGames.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
  }, [data]);

  return (
    <div className="px-4 lg:px-8 w-full lg:overflow-auto scrollbar-hide lg:pb-20">
      <h1 className="text-3xl font-bold pt-12 text-center lg:text-left text-gradient">
        Statistics: {selectedPlayer}
      </h1>

      <Space />

      {selectedPlayer ? (
        <>
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <div className="border w-full h-full rounded-xl p-4 flex flex-col items-start sm:flex-row sm:items-center sm:space-x-2">
              <p className="font-bold">Total games:</p>
              <p>{data?.allGames.length}</p>
            </div>

            <div className="border w-full h-full rounded-xl p-4 flex flex-col items-start sm:flex-row sm:items-center sm:space-x-2">
              <p className="font-bold">Win ratio:</p>
              <p>{data ? Math.round(data?.winPercentage) : 0}%</p>
            </div>

            <div className="border w-full h-full rounded-xl p-4 flex flex-col items-start sm:flex-row sm:items-center sm:space-x-2">
              <p className="font-bold">Most played move:</p>
              <p>{data?.mostPlayedMove}</p>
            </div>
          </div>

          <Space size={8} />

          <h1 className="text-3xl font-bold text-center text-gradient lg:text-left">
            Played games
          </h1>

          <Space size={4} />

          <div className="space-y-2">
            {sortedGames.map((game) => (
              <Game game={game} />
            ))}
          </div>

          <Space />

          <p className="text-center text-xs">No more games...</p>
        </>
      ) : (
        <p className="text-sm text-gray-500 text-center lg:text-left">
          Select a player to view stats...
        </p>
      )}
    </div>
  );
};

export default Statistics;
