import * as Comlink from "comlink";

export interface WorkerApi {
  getName: typeof getName;
  initializeGames: typeof initializeGames;
}

const workerApi: WorkerApi = {
  getName,
  initializeGames,
};

async function getName() {
  const res = await fetch(
    "https://random-word-api.herokuapp.com/word?number=1"
  );
  const json = await res.json();
  return json[0];
}

async function initializeGames(cursor: string) {
  try {
    const res = await fetch("/api/initialize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cursor,
      }),
    });

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

Comlink.expose(workerApi);
