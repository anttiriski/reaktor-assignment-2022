import { useState, useContext, createContext, useEffect } from "react";

const initialState = {
  selectedPlayer: null,
  hasInitialized: false,
};

const gameContext = createContext(undefined);

export function GameContext({ children }) {
  const [selectedPlayer, setSelectedPlayer] = useState(
    initialState.selectedPlayer
  );

  const [hasInitialized, setHasInitialized] = useState(
    initialState.hasInitialized
  );

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
