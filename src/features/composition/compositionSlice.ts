import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerDetail {
  open?: boolean;
}

interface CompositionState {
  editingPlayer: string | null;
  playerDetails: Record<string, PlayerDetail>;
}

const initialState: CompositionState = {
  playerDetails: {},
  editingPlayer: null,
};

const compositionSlice = createSlice({
  name: "composition",
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
} = compositionSlice.actions;

export default compositionSlice.reducer;
