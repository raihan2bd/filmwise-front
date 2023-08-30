import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react'

const baseApiUrl = import.meta.env.VITE_API_BASE_URL;

export const genresApi = createApi({
  reducerPath: 'movie-genres',
  baseQuery: fetchBaseQuery({baseUrl: baseApiUrl}) as BaseQueryFn<string | FetchArgs, unknown, CustomErrorType, {}>,
  tagTypes: ['Genres-API'],
  endpoints: (builder) => ({
    getAllGenres: builder.query<GenresResponse, void>({
      query: () => '/genres',
    }),
  })
})

export const {
  useGetAllGenresQuery,
} = genresApi;