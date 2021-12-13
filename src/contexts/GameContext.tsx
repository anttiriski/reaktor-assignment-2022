import { useState, useContext, createContext, useEffect } from "react";

const initialState = {
  selectedPlayer: null,
};

const gameContext = createContext(undefined);

export function GameContext({ children }) {
  const [selectedPlayer, setSelectedPlayer] = useState(
    initialState.selectedPlayer
  );
  const [hasInitialized, setHasInitialized] = useState(false);

  return (
    <gameContext.Provider
      value={{
        selectedPlayer,
        setSelectedPlayer,
        hasInitialized,
        setHasInitialized,
      }}
    >
      {children}
    </gameContext.Provider>
  );
}

export function useGameState() {
  return useContext(gameContext);
}
