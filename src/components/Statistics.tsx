import { useMemo } from "react";
import useSWR from "swr";
import { useGameState } from "../contexts/GameContext";
import Game from "./Game";
import LoadingWheel from "./LoadingWheel";
import Space from "./Space";

const Statistics: React.FC = ({}) => {
  const { selectedPlayer } = useGameState();

  const { data, error } = useSWR(
    `/api/statistics?player=${selectedPlayer}`,
    (url) => fetch(url).then((res) => res.json()),
    { refreshInterval: 2000 }
  );

  // Sort by timestamp
  const sortedData = useMemo(() => {
    if (!data) return [];

    return data.allGames.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
  }, [data]);

  return (
    <div>
      <h1 className="text-3xl font-bold pt-12">Statistics: {selectedPlayer}</h1>

      <Space />

      {selectedPlayer ? (
        <>
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <div className="border w-full h-full rounded-xl p-4 flex items-center space-x-2">
              <p className="font-bold">Total games:</p>
              <p>{data?.allGames.length}</p>
            </div>

            <div className="border w-full h-full rounded-xl p-4 flex items-center space-x-2">
              <p className="font-bold">Win ratio:</p>
              <p>{Math.round(data?.winProsentage)}%</p>
            </div>

            <div className="border w-full h-full rounded-xl p-4 flex items-center space-x-2">
              <p className="font-bold">Most played move:</p>
              <p>{data?.mostPlayedMove}</p>
            </div>
          </div>

          <Space size={8} />

          <h1 className="text-3xl font-bold">Played games</h1>

          <Space size={4} />

          <div className="space-y-2">
            {data?.allGames.map((game) => (
              <Game game={game} />
            ))}
          </div>

          <Space />

          <p className="text-center text-xs">No more games...</p>
        </>
      ) : (
        <p className="text-sm text-gray-500">
          Select a player to view stats...
        </p>
      )}
    </div>
  );
};

export default Statistics;
