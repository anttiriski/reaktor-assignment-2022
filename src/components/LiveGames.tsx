import useSWR from "swr";

const LiveGames = () => {
  const { data, error } = useSWR(
    "api/live",
    (url) => fetch(url).then((res) => res.json()),
    { refreshInterval: 2000 }
  );

  return (
    <div className="flex items-center p-4 mx-auto min-h-screen justify-center">
      <div className="flex flex-col">
        {data?.games.map((game) => {
          return <div>{game.gameId}</div>;
        })}
      </div>
    </div>
  );
};

export default LiveGames;
