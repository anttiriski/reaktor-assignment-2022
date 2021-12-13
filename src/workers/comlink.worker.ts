import * as Comlink from "comlink";

export interface WorkerApi {
  initializeGames: typeof initializeGames;
}

const workerApi: WorkerApi = {
  initializeGames,
};

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

    const json = await res.json();

    return { ...json };
  } catch (error) {
    console.log(error);
  }
}

Comlink.expose(workerApi);
