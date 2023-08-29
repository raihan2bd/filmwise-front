import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import {featureMoviesApi} from './services/featureMoviesApi';
import { moviesApi } from "./services/movieApi";

export const store = configureStore({
  reducer: {auth: authSlice, [featureMoviesApi.reducerPath]: featureMoviesApi.reducer, [moviesApi.reducerPath]: moviesApi.reducer},
  devTools: import.meta.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([
    featureMoviesApi.middleware,
    moviesApi.middleware,
  ]),
});
