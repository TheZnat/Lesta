import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice/filterSlice";
import dataReducer from "./slices/data/dataSlice";
import filterMiddleware from "./slices/filterSlice/filterMiddleware";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(filterMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
