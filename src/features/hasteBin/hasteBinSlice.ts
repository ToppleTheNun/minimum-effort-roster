import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CharacterSpecInComp } from "../composition/compositionSlice";
import { Player } from "../../types/Player";
import { fromBase64, toBase64 } from "../../utils/base64";
import {
  getRawTextFromHasteBin,
  postRawTextToHasteBin,
} from "../../api/rawHastebinApi";

export interface RosterAndComposition {
  composition?: Record<string, CharacterSpecInComp>;
  roster?: Array<Player>;
}

interface HasteBinState {
  exportError?: string;
  exportLink?: string;
  exportPending: boolean;
  importError?: string;
  importRosterAndComposition?: RosterAndComposition;
  importPending: boolean;
}

export const getRosterAndCompositionFromHasteBin = createAsyncThunk<
  RosterAndComposition,
  string,
  { rejectValue: Error }
>("hasteBin/getRosterAndComposition", async (code: string) => {
  const { data: rawHasteBinContents } = await getRawTextFromHasteBin(code);
  return fromBase64(rawHasteBinContents);
});

export const postRosterAndCompositionToHasteBin = createAsyncThunk<
  string,
  RosterAndComposition,
  { rejectValue: Error }
>(
  "hasteBin/postRosterAndComposition",
  async (rosterAndComposition: RosterAndComposition) => {
    const exportValue = toBase64(rosterAndComposition);
    const { data: rawHasteBinLink } = await postRawTextToHasteBin(exportValue);
    return rawHasteBinLink;
  }
);

const initialState: HasteBinState = {
  exportError: undefined,
  exportLink: undefined,
  exportPending: false,
  importError: undefined,
  importRosterAndComposition: undefined,
  importPending: false,
};

const hasteBinSlice = createSlice({
  name: "hasteBin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRosterAndCompositionFromHasteBin.pending, (state) => {
      state.importError = undefined;
      state.importRosterAndComposition = undefined;
      state.importPending = true;
    });
    builder.addCase(
      getRosterAndCompositionFromHasteBin.fulfilled,
      (state, { payload }) => {
        state.importError = undefined;
        state.importRosterAndComposition = payload;
        state.importPending = false;
      }
    );
    builder.addCase(
      getRosterAndCompositionFromHasteBin.rejected,
      (state, { payload }) => {
        state.importError = payload?.toString();
        state.importRosterAndComposition = undefined;
        state.importPending = false;
      }
    );
    builder.addCase(postRosterAndCompositionToHasteBin.pending, (state) => {
      state.exportError = undefined;
      state.exportLink = undefined;
      state.exportPending = true;
    });
    builder.addCase(
      postRosterAndCompositionToHasteBin.fulfilled,
      (state, { payload }) => {
        state.exportError = undefined;
        state.exportLink = payload;
        state.exportPending = false;
      }
    );
    builder.addCase(
      postRosterAndCompositionToHasteBin.rejected,
      (state, { payload }) => {
        state.exportError = payload?.toString();
        state.exportLink = undefined;
        state.exportPending = false;
      }
    );
  },
});

export default hasteBinSlice.reducer;
