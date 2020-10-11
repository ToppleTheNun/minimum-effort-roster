import { combineReducers } from "@reduxjs/toolkit";

import playerBuilderSliceReducer from "../features/playerBuilder/playerBuilderSlice";
import rosterSliceReducer from "../features/roster/rosterSlice";

const rootReducer = combineReducers({
  playerBuilder: playerBuilderSliceReducer,
  roster: rosterSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
