import React, { useCallback, useState } from "react";
import { useLocalStorage } from "@rehooks/local-storage";

import RosterContext from "../context/roster";
import { Player } from "../types/Player";

interface RosterProviderProps {
  children?: React.ReactNode;
}

const RosterProvider = ({ children }: RosterProviderProps) => {
  const [roster, setRoster] = useLocalStorage<Player[]>(
    "minimum-effort-roster",
    []
  );

  const addPlayer = (player: Player) => {
    const newRoster = [...roster, { ...player }];
    setRoster(newRoster);
  };

  const removePlayerById = (id: string) => {
    setRoster(roster.filter((member) => member.id !== id));
  };

  const savePlayer = (id: string, player: Player) => {
    setRoster(
      roster.map((member) => {
        if (member.id === id) {
          return { ...player, id };
        }
        return member;
      })
    );
  };

  return (
    <RosterContext.Provider
      value={{
        roster,
        addPlayer,
        removePlayerById,
        savePlayer,
      }}
    >
      {children}
    </RosterContext.Provider>
  );
};

export default RosterProvider;
