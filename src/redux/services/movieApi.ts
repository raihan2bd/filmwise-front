import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react'
import { getTokenFromLocalStorage } from '../../utils/getToken';

const baseApiUrl = import.meta.env.VITE_API_BASE_URL;

export const moviesApi = createApi({
  reducerPath: 'movies-api',
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiUrl,
    prepareHeaders: (headers) => {
      const authToken = getTokenFromLocalStorage();

      if (authToken) {
        headers.set('Authorization', `Bearer ${authToken}`);
      }

      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomErrorType, {}>,
  tagTypes: ['Movies-API'],
  endpoints: (builder) => ({
     
    getFilteredMovies: builder.query<MoviesResponse, string>({
      query: (url) => `${baseApiUrl}/${url}`,
    }),

    getSingleMovie: builder.query<MovieResponse, number>({
      query: (id) => `${baseApiUrl}/movie/get_one/${id}`
    }),

    createRating: builder.mutation<UpdateRatingResponse, RatingInputType>({
      query: (ratingInput) => ({
        url: `${baseApiUrl}/rating/add`,
        method: 'POST',
        body: ratingInput,
      }),
      invalidatesTags: [{ type: 'Movies-API'}],
    }),


  })
})

export const {
 useGetFilteredMoviesQuery,
 useGetSingleMovieQuery,
 useCreateRatingMutation,
} = moviesApi;