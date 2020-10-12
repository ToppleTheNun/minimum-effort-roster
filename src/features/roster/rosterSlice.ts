import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../../types/Player";
import {
  readFromLocalStorage,
  writeToLocalStorage,
} from "../../utils/localStorage";

interface PlayerIdAndSpecId {
  playerId: string;
  specId: string;
}

interface RosterState {
  players: Player[];
}

const initialState: RosterState = readFromLocalStorage("roster") ?? {
  players: [],
};

const rosterSlice = createSlice({
  name: "roster",
  initialState,
  reducers: {
    importRoster(state, action: PayloadAction<Player[]>) {
      state.players = action.payload;
      writeToLocalStorage("roster", state);
    },
    removePlayerById(state, action: PayloadAction<string>) {
      const index = state.players.findIndex(
        (player) => player.id === action.payload
      );
      if (index !== -1) {
        state.players.splice(index, 1);
      }
      writeToLocalStorage("roster", state);
    },
    savePlayer(state, action: PayloadAction<Player>) {
      const index = state.players.findIndex(
        (player) => player.id === action.payload.id
      );
      if (index !== -1) {
        state.players[index] = action.payload;
      } else {
        state.players.push(action.payload);
      }
      writeToLocalStorage("roster", state);
    },
    removeSpecFromPlayer(state, action: PayloadAction<PlayerIdAndSpecId>) {
      const index = state.players.findIndex(
        (player) => player.id === action.payload.playerId
      );
      if (index === -1) {
        console.log("could not find player by id", action.payload);
        return;
      }
      const player = state.players[index];
      state.players[index] = {
        ...player,
        characterSpecializations: player.characterSpecializations.filter(
          (it) => it.id !== action.payload.specId
        ),
      };
      writeToLocalStorage("roster", state);
    },
  },
});

export const {
  importRoster,
  removePlayerById,
  removeSpecFromPlayer,
  savePlayer,
} = rosterSlice.actions;

export default rosterSlice.reducer;
