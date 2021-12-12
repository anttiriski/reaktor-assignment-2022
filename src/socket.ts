const createWebsocket = () => {
  if (typeof window === "undefined") return;

  let ws = new WebSocket("ws://bad-api-assignment.reaktor.com/rps/live");

  ws.onmessage = async (message) => {
    const data = JSON.parse(JSON.parse(message.data));

    const gameId = data.gameId;
    const playerA = data.playerA;
    const playerB = data.playerB;

    switch (data.type) {
      case "GAME_BEGIN": {
        try {
          fetch("/api/begin-game", {
            method: "POST",
            body: JSON.stringify({ gameId, playerA, playerB }),
          });

          return;
        } catch (error) {
          console.log(error);
        }
      }

      case "GAME_RESULT": {
        try {
          const playerAMove = data.playerA.played;
          const playerBMove = data.playerB.played;

          fetch("/api/finish-game", {
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

          return;
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

export { createWebsocket };
