import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react'

const baseApiUrl = import.meta.env.VITE_API_BASE_URL;

export const featureMoviesApi = createApi({
  reducerPath: 'feature-movies',
  baseQuery: fetchBaseQuery({baseUrl: baseApiUrl}) as BaseQueryFn<string | FetchArgs, unknown, CustomErrorType, {}>,
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