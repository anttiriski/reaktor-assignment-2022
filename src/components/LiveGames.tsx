import useSWR from "swr";
import Space from "./Space";

const LiveGames = () => {
  const { data, error } = useSWR(
    "api/live",
    (url) => fetch(url).then((res) => res.json()),
    { refreshInterval: 2000 }
  );

  return (
    <div className="flex flex-col mt-20 bg-black text-white rounded-2xl mr-8 p-8 self-start">
      <h1 className="text-3xl">Live Games</h1>

      <Space />

      {data?.games.map((game) => {
        return (
          <div className="grid grid-cols-3">
            <div>{game.playerA}</div>
            <p className="text-center">vs</p>
            <div>{game.playerB}</div>
          </div>
        );
      })}
    </div>
  );
};

export default LiveGames;
