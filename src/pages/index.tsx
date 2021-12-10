import useSWR from "swr";
import redis from "../redis";

const Home = () => {
  const { data, error } = useSWR(
    "api/history",
    (url) => fetch(url).then((res) => res.json()),
    { refreshInterval: 2000 }
  );

  return (
    <div className="flex items-center p-4 mx-auto min-h-screen justify-center">
      <main>
        <h1 className="font-mono text-xl code">
          Welcome to <span className="text-purple-700">Nextjs</span>,{" "}
          <span className="text-indigo-700">TailwindCSS</span> and{" "}
          <span className="text-gray-700">TypeScript</span>
        </h1>
        {data?.data.map((game) => {
          const parsed = JSON.parse(game);
          return (
            <div>
              {parsed.gameId}: {parsed.t}
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const res = await fetch("https://bad-api-assignment.reaktor.com/rps/history");
  const { data } = await res.json();

  redis.flushall();

  const sortedByTime = data.sort((a, b) => {
    const aTime = new Date(a.t).getTime();
    const bTime = new Date(b.t).getTime();
    return aTime - bTime;
  });

  data.forEach(async (game) => {
    await redis.rpush("cache", JSON.stringify(game));
  });

  //const a = await redis.sort("cache", "BY", "t");

  return {
    props: {},
  };
}
