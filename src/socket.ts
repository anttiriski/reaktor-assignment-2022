const createWebSocket = () => {
  if (typeof window === "undefined") return;

  let ws = new WebSocket("ws://bad-api-assignment.reaktor.com/rps/live");

  ws.onmessage = async (message) => {
    const data = JSON.parse(JSON.parse(message.data));

    const { type, gameId, playerA, playerB } = data;

    switch (type) {
      case "GAME_BEGIN": {
        try {
          return await fetch("/api/begin-game", {
            method: "POST",
            body: JSON.stringify({ gameId, playerA, playerB }),
          });
        } catch (error) {
          console.log(error);
        }
      }

      case "GAME_RESULT": {
        try {
          const playerAMove = data.playerA.played;
          const playerBMove = data.playerB.played;

          return await fetch("/api/finish-game", {
            method: "POST",
            body: JSON.stringify({
              gameId,
              playerA,
              playerB,
              timestamp: data.t,
              playerAMove,
              playerBMove,
            }),
          });
        } catch (error) {
          console.log(error);
        }
      }

      default:
        return;
    }
  };

  return ws;
};

export { createWebSocket };
