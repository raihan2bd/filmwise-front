import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
// import { featureMoviesApi } from './services/featureMoviesApi';
import { moviesApi } from "./services/movieApi";
import { genresApi } from './services/genresApi';

export interface RootStoreType {
  auth: ReturnType<typeof authSlice>;
  movies: ReturnType<typeof moviesApi.reducer>;
  genres: ReturnType<typeof genresApi.reducer>;
}

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [moviesApi.reducerPath]: moviesApi.reducer,
    [genresApi.reducerPath]: genresApi.reducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      moviesApi.middleware,
      genresApi.middleware,
    ]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
