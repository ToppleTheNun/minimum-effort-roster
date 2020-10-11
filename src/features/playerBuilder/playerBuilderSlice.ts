import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerDetail {
  open?: boolean;
}

interface PlayerBuilderState {
  editingPlayer: string | null;
  playerDetails: Record<string, PlayerDetail>;
}

const initialState: PlayerBuilderState = {
  playerDetails: {},
  editingPlayer: null,
};

const playerBuilderSlice = createSlice({
  name: "playerBuilder",
  initialState,
  reducers: {
    editPlayer(state, action: PayloadAction<string>) {
      state.editingPlayer = action.payload;
    },
    stopEditingPlayer(state) {
      state.editingPlayer = null;
    },
    openPlayerDetails(state, action: PayloadAction<string[]>) {
      action.payload.forEach(it => {
        const existingPlayerDetails = state.playerDetails[it] ?? {};
        state.playerDetails[it] = {
          ...existingPlayerDetails,
          open: true,
        };
      })
    },
    closePlayerDetails(state, action: PayloadAction<string[]>) {
      action.payload.forEach(it => {
        const existingPlayerDetails = state.playerDetails[it] ?? {};
        state.playerDetails[it] = {
          ...existingPlayerDetails,
          open: false,
        };
      })
    },
  },
});

export const {
  editPlayer,
  stopEditingPlayer,
  openPlayerDetails,
  closePlayerDetails,
} = playerBuilderSlice.actions;

export default playerBuilderSlice.reducer;
