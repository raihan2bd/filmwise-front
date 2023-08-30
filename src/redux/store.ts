import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import { featureMoviesApi } from './services/featureMoviesApi';
import { moviesApi } from "./services/movieApi";
import { genresApi } from './services/genresApi';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [featureMoviesApi.reducerPath]: featureMoviesApi.reducer, // Check if these paths align with your slice configurations
    [moviesApi.reducerPath]: moviesApi.reducer,
    [genresApi.reducerPath]: genresApi.reducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([ // Consider using the default middleware here
      featureMoviesApi.middleware,
      moviesApi.middleware,
      genresApi.middleware,
    ]),
});
