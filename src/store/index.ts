import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import titleReducer from "./titleSlice";
import authReducer from "./authSlice";
const store = configureStore({
  reducer: {
    titles: titleReducer,
    auth: authReducer
  },
});
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store;

