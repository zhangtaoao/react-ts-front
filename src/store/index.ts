import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./modules/common";

const store = configureStore({
  reducer: {
    common: commonReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;