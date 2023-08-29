import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react'

const baseApiUrl = import.meta.env.VITE_API_BASE_URL;

export const moviesApi = createApi({
  reducerPath: 'movies-api',
  baseQuery: fetchBaseQuery({baseUrl: baseApiUrl}) as BaseQueryFn<string | FetchArgs, unknown, CustomErrorType, {}>,
  tagTypes: ['Movies-API'],
  endpoints: (builder) => ({
    getFilteredMovies: builder.query<MoviesResponse, string>({
      query: (url) => `${baseApiUrl}/${url}`,
    }),
  })
})

export const {
 useGetFilteredMoviesQuery
} = moviesApi;