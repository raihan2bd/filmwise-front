import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react'

const baseApiUrl = import.meta.env.VITE_API_BASE_URL;

export const featureMoviesApi = createApi({
  reducerPath: 'feature-movies',
  baseQuery: fetchBaseQuery({baseUrl: baseApiUrl}) as BaseQueryFn<string | FetchArgs, unknown, CustomErrorType, {}>,
  tagTypes: ['Feature-Movies'],
  endpoints: (builder) => ({
    getFeatureMovies: builder.query<MoviesResponse, void>({
      query: () => '/movies',
    })
  })
})

export const {
  useGetFeatureMoviesQuery
} = featureMoviesApi;