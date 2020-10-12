import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../../types/Player";
import {
  readFromLocalStorage,
  writeToLocalStorage,
} from "../../utils/localStorage";

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
  },
});

export const {
  importRoster,
  removePlayerById,
  savePlayer,
} = rosterSlice.actions;

export default rosterSlice.reducer;
