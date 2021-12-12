import { useState, useContext, createContext, useEffect } from "react";

const initialState = {
  selectedPlayer: null,
};

const gameContext = createContext(undefined);

export function GameContext({ children }) {
  const [selectedPlayer, setSelectedPlayer] = useState(
    initialState.selectedPlayer
  );

  return (
    <gameContext.Provider
      value={{
        selectedPlayer,
        setSelectedPlayer,
      }}
    >
      {children}
    </gameContext.Provider>
  );
}

export function useGameState() {
  return useContext(gameContext);
}
