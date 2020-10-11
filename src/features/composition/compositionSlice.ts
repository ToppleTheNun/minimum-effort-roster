import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerDetail {
  open?: boolean;
  specsEnabled?: Record<string, boolean>
}

interface CharacterSpecInComp {
  specId: string;
  locked: boolean;
}

interface AddPlayerSpecPayload {
  playerId: string;
  specId: string;
}

interface CompositionState {
  playerDetails: Record<string, PlayerDetail>;
  composition: Record<string, CharacterSpecInComp>;
}

const initialState: CompositionState = {
  playerDetails: {},
  composition: {},
};

const compositionSlice = createSlice({
  name: "composition",
  initialState,
  reducers: {
    openPlayerDetails(state, action: PayloadAction<string[]>) {
      action.payload.forEach((it) => {
        const existingPlayerDetails = state.playerDetails[it] ?? {};
        state.playerDetails[it] = {
          ...existingPlayerDetails,
          open: true,
        };
      });
    },
    closePlayerDetails(state, action: PayloadAction<string[]>) {
      action.payload.forEach((it) => {
        const existingPlayerDetails = state.playerDetails[it] ?? {};
        state.playerDetails[it] = {
          ...existingPlayerDetails,
          open: false,
        };
      });
    },
    lockPlayerSpec(state, action: PayloadAction<string>) {
      const playerSpec = state.composition[action.payload];
      if (playerSpec) {
        state.composition[action.payload] = { ...playerSpec, locked: true };
      }
    },
    unlockPlayerSpec(state, action: PayloadAction<string>) {
      const playerSpec = state.composition[action.payload];
      if (playerSpec) {
        state.composition[action.payload] = { ...playerSpec, locked: false };
      }
    },
    addPlayerSpec(state, action: PayloadAction<AddPlayerSpecPayload>) {
      const playerSpec = state.composition[action.payload.playerId];
      if (playerSpec) {
        state.composition[action.payload.playerId] = {
          ...playerSpec,
          specId: action.payload.specId,
        };
      } else {
        state.composition[action.payload.playerId] = {
          specId: action.payload.specId,
          locked: false,
        };
      }
    },
    removePlayerSpec(state, action: PayloadAction<string>) {
      const playerSpec = state.composition[action.payload];
      if (playerSpec) {
        delete state.composition[action.payload];
      }
    },
  },
});

export const {
  addPlayerSpec,
  closePlayerDetails,
  lockPlayerSpec,
  openPlayerDetails,
  removePlayerSpec,
  unlockPlayerSpec
} = compositionSlice.actions;

export default compositionSlice.reducer;
