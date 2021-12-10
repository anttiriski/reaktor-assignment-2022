import useSWR from "swr";

const Test = () => {
  const { data, error } = useSWR(
    "api/games",
    (url) => fetch(url).then((res) => res.json()),
    { refreshInterval: 2000 }
  );

  return (
    <div className="flex items-center p-4 mx-auto min-h-screen justify-center">
      hello
    </div>
  );
};

export default Test;
