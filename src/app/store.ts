import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook } from "react-redux";

import rootReducer, { RootState } from "./rootReducer";

const store = configureStore({ reducer: rootReducer });

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./rootReducer", () => {
    const newRootReducer = require("./rootReducer").default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;