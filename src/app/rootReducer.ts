import { combineReducers } from "@reduxjs/toolkit";

import compositionSliceReducer from "../features/composition/compositionSlice";
import hasteBinSliceReducer from "../features/hasteBin/hasteBinSlice";
import playerBuilderSliceReducer from "../features/playerBuilder/playerBuilderSlice";
import rosterSliceReducer from "../features/roster/rosterSlice";
import sharingSliceReducer from "../features/sharing/sharingSlice";

const rootReducer = combineReducers({
  composition: compositionSliceReducer,
  hasteBin: hasteBinSliceReducer,
  playerBuilder: playerBuilderSliceReducer,
  roster: rosterSliceReducer,
  sharing: sharingSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
