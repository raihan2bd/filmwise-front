// import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react'
// import { getTokenFromLocalStorage } from '../../utils/getToken';

// const baseApiUrl = import.meta.env.VITE_API_BASE_URL;

// export const moviesApi = createApi({
//   reducerPath: 'movies-api',
//   baseQuery: fetchBaseQuery({
//     baseUrl: baseApiUrl,
//     prepareHeaders: (headers) => {
//       const authToken = getTokenFromLocalStorage();

//       if (authToken) {
//         headers.set('Authorization', `Bearer ${authToken}`);
//       }

//       return headers;
//     },
//   }) as BaseQueryFn<string | FetchArgs, unknown, CustomErrorType, {}>,
//   tagTypes: ['Movies-API', 'All-Movies', 'Single-Movie'],
//   endpoints: (builder) => ({
     
//     getFilteredMovies: builder.query<MoviesResponse, string>({
//       query: (url) => `${baseApiUrl}/${url}`,
//       providesTags: ["All-Movies"],
//     }),
    
//     getSingleMovie: builder.query<MovieResponse, number>({
//       query: (id) => `${baseApiUrl}/movie/get_one/${id}`,
//       providesTags: ["Single-Movie"],
//     }),

//     createRating: builder.mutation<UpdateRatingResponse, RatingInputType>({
//       query: (ratingInput) => ({
//         url: `${baseApiUrl}/rating/add`,
//         method: 'POST',
//         body: ratingInput,
//       }),
//       invalidatesTags: ['Single-Movie', 'All-Movies'],
//     }),


//   })
// })

// export const {
//  useGetFilteredMoviesQuery,
//  useGetSingleMovieQuery,
//  useCreateRatingMutation,
// } = moviesApi;

import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { getTokenFromLocalStorage } from '../../utils/getToken';

const baseApiUrl = import.meta.env.VITE_API_BASE_URL;

// // Define an interface to match the structure of BaseQueryArgs
// interface BaseQueryArgs {
//   url: string;
//   method?: string;
//   body?: any;
// }

// import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const axiosBaseQuery = (
  { baseUrl }: { baseUrl: string } = { baseUrl: '' }
): BaseQueryFn<
  {
    url: string;
    method?: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
  },
  unknown,
  unknown
> => async ({ url, method = 'GET', data }) => { // Set 'GET' as the default value for method
  try {
    const authToken = getTokenFromLocalStorage(); // Get your authentication token

    const headers: AxiosRequestConfig['headers'] = {};

    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`; // Add the authorization header if authToken is available
    }

    const result = await axios({ url: baseUrl + url, method, data, headers }); // Pass the headers here
    return { data: result.data };
  } catch (axiosError) {
    let err = axiosError as AxiosError;
    return { error: { status: err.response?.status, data: err.response?.data } };
  }
};



// Define a base query function using Axios
// const baseQuery: BaseQueryFn<BaseQueryArgs, unknown, unknown, CustomErrorType, {}> = async (
//   { url, method, body }
// ) => {
//   const authToken = getTokenFromLocalStorage();
//   const headers: AxiosRequestConfig['headers'] = {};

//   if (authToken) {
//     headers.Authorization = `Bearer ${authToken}`;
//   }

//   const config: AxiosRequestConfig = {
//     method: method ?? 'GET',
//     url: `${baseApiUrl}/${url}`,
//     headers,
//     data: method === 'GET' ? undefined : body,
//   };

//   try {
//     const response = await axios(config);
//     return { data: response.data };
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError;
//       return {
//         error: {
//           status: axiosError.response?.status ?? 500,
//           data: axiosError.response?.data ?? 'An error occurred on the server.',
//         },
//       };
//     } else {
//       return { error: { status: 500, data: 'Internal Server Error' } };
//     }
//   }
// };

export const moviesApi = createApi({
  reducerPath: 'movies-api',
  baseQuery: axiosBaseQuery({
    baseUrl: baseApiUrl,
  }),
  tagTypes: ['Movies-API', 'All-Movies', 'Single-Movie'],
  endpoints: (builder) => ({
    getFilteredMovies: builder.query<MoviesResponse, string>({
      query: (url) => ({url: `/${url}`}),
      providesTags: ['All-Movies'],
    }),
    getSingleMovie: builder.query<MovieResponse, number>({
      query: (id) => ({url: `/movie/get_one/${id}`}),
      providesTags: ['Single-Movie'],
    }),
    createRating: builder.mutation<UpdateRatingResponse, RatingInputType>({
      query: (ratingInput) => ({
        url: '/rating/add',
        method: 'POST',
        data: ratingInput,
      }),
      invalidatesTags: ['Single-Movie', 'All-Movies'],
    }),
  }),
});

export const {
  useGetFilteredMoviesQuery,
  useGetSingleMovieQuery,
  useCreateRatingMutation,
} = moviesApi;
