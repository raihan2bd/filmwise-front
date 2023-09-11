import { createApi, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { getTokenFromLocalStorage } from "../../utils/getToken";

const baseApiUrl = import.meta.env.VITE_API_BASE_URL;

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method = "GET", data }) => {
    try {
      const authToken = getTokenFromLocalStorage();

      const headers: AxiosRequestConfig["headers"] = {};

      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      }

      const result = await axios({ url: baseUrl + url, method, data, headers });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export const moviesApi = createApi({
  reducerPath: "movies-api",
  baseQuery: axiosBaseQuery({
    baseUrl: baseApiUrl,
  }),
  tagTypes: ["Movies-API", "All-Movies", "Single-Movie"],
  endpoints: (builder) => ({
    getFilteredMovies: builder.query<MoviesResponse, string>({
      query: (url) => ({ url: `/${url}` }),
      providesTags: ["All-Movies"],
    }),
    getSingleMovie: builder.query<MovieResponse, number>({
      query: (id) => ({ url: `/movie/get_one/${id}` }),
      providesTags: ["Single-Movie"],
    }),
    createRating: builder.mutation<
      UpdateRatingResponse | CustomErrorType,
      RatingInputType
>({
      query: (ratingInput) => ({
        url: "/rating/add",
        method: "POST",
        data: ratingInput,
      }),
      invalidatesTags: ["Single-Movie", "All-Movies"],
    }),
  }),
});

export const {
  useGetFilteredMoviesQuery,
  useGetSingleMovieQuery,
  useCreateRatingMutation,
} = moviesApi;
