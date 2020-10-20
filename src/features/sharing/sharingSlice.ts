import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SharingState {
  rosterAndCompositionCode: string;
}

const initialState: SharingState = {
  rosterAndCompositionCode: "",
};

const sharingSlice = createSlice({
  name: "sharing",
  initialState,
  reducers: {
    setRosterAndCompositionCode(state, action: PayloadAction<string>) {
      state.rosterAndCompositionCode = action.payload;
    },
  },
});

export const { setRosterAndCompositionCode } = sharingSlice.actions;

export default sharingSlice.reducer;
