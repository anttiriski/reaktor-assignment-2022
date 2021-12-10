import { useState, useContext, createContext, useEffect } from "react";
import useSWR from "swr";

const initialState = {
  games: [],
};

const gameContext = createContext(undefined);

export function GameContext({ children }) {
  const [games, setGames] = useState(initialState.games);

  return (
    <gameContext.Provider
      value={{
        games,
      }}
    >
      {children}
    </gameContext.Provider>
  );
}

export function useGameState() {
  return useContext(gameContext);
}
