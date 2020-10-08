import React from "react";

import { Player } from "../types/Player";

interface RosterContextType {
  roster: Player[];
  addPlayer: (player: Player) => void;
  removePlayerById: (id: string) => void;
  savePlayer: (id: string, player: Player) => void;
}

const defaultRosterContextValue: RosterContextType = {
  roster: [],
  addPlayer: () => {},
  removePlayerById: () => {},
  savePlayer: () => {},
};

const RosterContext = React.createContext<RosterContextType>(
  defaultRosterContextValue
);

export default RosterContext;
