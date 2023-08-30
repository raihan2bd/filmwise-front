import { useState, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetFilteredMoviesQuery } from "../redux/services/movieApi";
import { useGetAllGenresQuery } from "../redux/services/genresApi";

import Spinner from "../components/UI/Spinner";
import MovieItem from "../components/Movies/MovieItem";

const MoviesPage = () => {
  const [showFiltered, setShowFiltered] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const currentPage = Number(queryParams.get("page")) || 1;
  const limit = Number(queryParams.get("limit")) || 10;

  const [filteredState, setFilteredState] = useState({
    limit,
    order_by: queryParams.get("order_by") || "",
    genre: queryParams.get("genre") || "",
    year: queryParams.get("year") || "",
  });

  const {
    isLoading,
    isSuccess,
    isError,
    data: featureMovies,
    error,
  } = useGetFilteredMoviesQuery(
    `movies?limit=${limit}&page=${currentPage}${
      queryParams.has("s") ? `&s=${queryParams.get("s")}` : ""
    }${queryParams.has("genre") ? `&genre=${queryParams.get("genre")}` : ""}${
      queryParams.has("year") ? `&year=${queryParams.get("year")}` : ""
    }${
      queryParams.has("order_by")
        ? `&order_by=${queryParams.get("order_by")}`
        : ""
    }`
  );

  const {
    isLoading: genresLoading,
    isSuccess: genresSuccess,
    data: genres,
  } = useGetAllGenresQuery();

  const handlePageChange = useCallback(
    (newPage: number | null) => {
      if (typeof newPage === "number") {
        // Update the URL with the new page number
        queryParams.set("page", newPage.toString());
        navigate(`?${queryParams.toString()}`);
      }
    },
    [queryParams, navigate]
  );

  const handleFilterChange = useCallback(
    (filterName: string, value: string | number) => {
      setFilteredState((prevState) => ({
        ...prevState,
        [filterName]: value,
      }));
    },
    []
  );

  const handleSubmitFilter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Clone the existing query parameters
    const newQueryParams = new URLSearchParams(queryParams);

    // Update the cloned query parameters with the new filter values
    newQueryParams.set("limit", filteredState.limit.toString());
    if (filteredState.order_by)
      newQueryParams.set("order_by", filteredState.order_by);
    if (filteredState.genre) newQueryParams.set("genre", filteredState.genre);
    if (filteredState.year)
      newQueryParams.set("year", filteredState.year.toString());

    // Update the URL with the new query parameters
    navigate(`?${newQueryParams.toString()}`);
  };

  const memoizedContent = useMemo(() => {
    if (isLoading) {
      return <Spinner />;
    } else if (isError) {
      let errorMessage;

      if ("data" in error && error.data) {
        errorMessage = error.data.error.message;
      } else {
        errorMessage = "An unknown error occurred. Please try again.";
      }

      return <p className="text-red-500 text-lg shadow">{errorMessage}</p>;
    } else if (isSuccess && featureMovies.movies) {
      const { total_count, per_page, current_page, movies } = featureMovies;
      const pages = Math.ceil(total_count / per_page);
      const prevPage = current_page > 1 ? current_page - 1 : null;
      const nextPage = current_page < pages;

      return (
        <>
          <ul className="flex flex-row justify-center list-none flex-wrap mt-4">
            {movies.map((item) => {
              return <MovieItem key={item.id} item={item} />;
            })}
          </ul>
          <div className="flex justify-center my-4 items-center">
            <button
              onClick={() => handlePageChange(prevPage)}
              disabled={!prevPage}
              className="mr-2 bg-lime-500 px-2 py-1 rounded-sm text-sm disabled:opacity-25 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <p className="mx-2 text-sm">
              {current_page} <span className="text-white/50">of</span> {pages}
            </p>
            <button
              onClick={() => handlePageChange(current_page + 1)}
              disabled={!nextPage}
              className="ml-2 bg-lime-500 px-2 py-1 rounded-sm text-sm disabled:opacity-25 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </>
      );
    }

    return (
      <p className="text-red-500 text-lg shadow text-center w-fit mx-auto px-4 py-2">
        No Movies Found!
      </p>
    );
  }, [isLoading, isError, error, isSuccess, featureMovies]);

  const memorizeGenresOptions = useMemo(() => {
    if (genresLoading) {
      return <option value="">Loading...</option>;
    } else if (genresSuccess && genres.genres) {
      return genres.genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.genre_name}
        </option>
      ));
    }
    return <option value="">Failed to load the genres</option>;
  }, [genresLoading, genresSuccess, genres]);

  const memoizedBtnClasses = useMemo(
    () =>
      showFiltered
        ? "rounded-lg border px-4 py-1 text-sm border-sky-500 text-red-500"
        : "rounded-lg border px-4 py-1 text-sm border-sky-500 text-sky-500",
    [showFiltered]
  );

  return (
    <section className="min-h-[250px] bg-white/5 px-4 py-6">
      <h2 className="text-center text-2xl py-2 font-bold border-b-2 border-yellow-400 flex justify-between items-center">
        Movies
        <button
          type="button"
          className={memoizedBtnClasses}
          onClick={() => {
            setShowFiltered((prev) => !prev);
          }}
        >
          Filters
        </button>
      </h2>
      {showFiltered && (
        <form
          onSubmit={(e) => handleSubmitFilter(e)}
          className="bg-white/10 mb-4 p-4"
        >
          <div className="flex justify-between items-center gap-1 flex-wrap">
            <div className="flex flex-col justify-center items-center gap-1 flex-grow flex-shrink min-w[180px] max-w-[400px]">
              <label htmlFor="limit">Limit</label>
              <select
                value={filteredState.limit}
                name="limit"
                id="limit"
                className="bg-white/50 w-[100%] flex-grow flex-shrink p-2 text-black rounded"
                onChange={(e) => handleFilterChange("limit", e.target.value)}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={50}>50</option>
              </select>
            </div>
            <div className="flex flex-col justify-center items-center gap-1 flex-grow flex-shrink min-w[180px] max-w-[400px]">
              <label htmlFor="order_by">Order By</label>
              <select
                value={filteredState.order_by}
                name="order_by"
                id="order_by"
                className="bg-white/50 w-[100%] flex-grow flex-shrink p-2 text-black rounded"
                onChange={(e) => handleFilterChange("order_by", e.target.value)}
              >
                <option value="rating">Rating</option>
                <option value="runtime">Runtime</option>
                <option value="old">Oldest</option>
                <option value="name">Name</option>
              </select>
            </div>
            <div className="flex flex-col justify-center items-center gap-1 flex-grow flex-shrink min-w[180px] max-w-[400px]">
              <label htmlFor="genre">Genre</label>
              <select
                value={filteredState.genre}
                name="genre"
                id="genre"
                className="bg-white/50 w-[100%] flex-grow flex-shrink p-2 text-black rounded"
                onChange={(e) => handleFilterChange("genre", e.target.value)}
              >
                {memorizeGenresOptions}
              </select>
            </div>
            <div className="flex flex-col justify-center items-center gap-1 flex-grow flex-shrink min-w[180px] max-w-[400px]">
              <label htmlFor="year">Year</label>
              <input
                type="number"
                name="year"
                id="year"
                value={filteredState.year}
                className="bg-white/50 w-[100%] flex-grow flex-shrink p-2 text-black rounded placeholder:text-black"
                onChange={(e) => handleFilterChange("year", e.target.value)}
                placeholder="Year"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 block w-fit ms-auto px-4 py-2 bg-yellow-500 active:bg-yellow-700 text-white text-sm rounded-sm"
          >
            Apply Filter
          </button>
        </form>
      )}

      {memoizedContent}
    </section>
  );
};

export default MoviesPage;
