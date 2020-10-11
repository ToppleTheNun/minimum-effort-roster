import { combineReducers } from "@reduxjs/toolkit";

import compositionSliceReducer from "../features/composition/compositionSlice";
import playerBuilderSliceReducer from "../features/playerBuilder/playerBuilderSlice";
import rosterSliceReducer from "../features/roster/rosterSlice";

const rootReducer = combineReducers({
  composition: compositionSliceReducer,
  playerBuilder: playerBuilderSliceReducer,
  roster: rosterSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
