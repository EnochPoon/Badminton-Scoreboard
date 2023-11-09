import { configureStore } from "@reduxjs/toolkit";
import matchDataReducer from './matchData';

const store = configureStore({
  reducer: {
    matchData: matchDataReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
