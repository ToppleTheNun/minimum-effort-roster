import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerDetail {
  open?: boolean;
  specsEnabled?: Record<string, boolean>;
}

export interface CharacterSpecInComp {
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
    addPlayerToComposition(state, action: PayloadAction<AddPlayerSpecPayload>) {
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
    removePlayerFromComposition(state, action: PayloadAction<string>) {
      const playerSpec = state.composition[action.payload];
      if (playerSpec) {
        delete state.composition[action.payload];
      }
    },
    importComposition(
      state,
      action: PayloadAction<Record<string, CharacterSpecInComp>>
    ) {
      state.composition = action.payload;
    },
  },
});

export const {
  addPlayerToComposition,
  closePlayerDetails,
  importComposition,
  lockPlayerSpec,
  openPlayerDetails,
  removePlayerFromComposition,
  unlockPlayerSpec,
} = compositionSlice.actions;

export default compositionSlice.reducer;
