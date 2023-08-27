import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import {featureMoviesApi} from './services/featureMoviesApi';

export const store = configureStore({
  reducer: {auth: authSlice, [featureMoviesApi.reducerPath]: featureMoviesApi.reducer},
  devTools: import.meta.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([
    featureMoviesApi.middleware,
  ]),
});
