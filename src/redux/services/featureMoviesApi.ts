import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react'
import { getTokenFromLocalStorage } from '../../utils/getToken';

const baseApiUrl = import.meta.env.VITE_API_BASE_URL;

const customBaseQuery = fetchBaseQuery({
  baseUrl: baseApiUrl,
  prepareHeaders(headers) {
    // Get the token and add it to the "Authorization" header.
    const token = getTokenFromLocalStorage();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
}) as BaseQueryFn<string | FetchArgs, unknown, CustomErrorType, {}>;

export const featureMoviesApi = createApi({
  reducerPath: 'feature-movies',
  baseQuery: customBaseQuery,
  tagTypes: ['Feature-Movies'],
  endpoints: (builder) => ({
    getFeatureMovies: builder.query<MoviesResponse, void>({
      query: () => '/movies/feature',
    }),

    
    getPopularMovies: builder.query<MoviesResponse, void>({
      query: () => '/movies?order_by=rating&limit=5'
    }),

    getActionMovies: builder.query<MoviesResponse, void>({
      query: () => '/movies?genre=3&limit=5'
    }),

    getDramaMovies: builder.query<MoviesResponse, void>({
      query: () => '/movies?genre=1&limit=5'
    }),

    getMysteryMovies: builder.query<MoviesResponse, void>({
      query: () => '/movies?genre=6&limit=5'
    }),
  })
})

export const {
  useGetFeatureMoviesQuery,
  useGetPopularMoviesQuery,
  useGetActionMoviesQuery,
  useGetDramaMoviesQuery,
  useGetMysteryMoviesQuery,
} = featureMoviesApi;