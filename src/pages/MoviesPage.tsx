// import { useGetFilteredMoviesQuery } from "../redux/services/movieApi";
// import Spinner from "../components/UI/Spinner";
// import MovieItem from "../components/Movies/MovieItem";

// const MoviesPage = () => {
//   const {
//     isLoading,
//     isSuccess,
//     isError,
//     data: featureMovies,
//     error,
//   } = useGetFilteredMoviesQuery("movies?limit=1");

//   let content;
//   if (isLoading) {
//     content = <Spinner />;
//   } else if (isError) {
//     let errorMessage;

//     if ("data" in error && error.data) {
//       errorMessage = error.data.error.message;
//     } else {
//       errorMessage = "An unknown error occurred. Please try again.";
//     }

//     content = <p className="text-red-500 text-lg shadow">{errorMessage}</p>;
//   } else if (isSuccess && featureMovies.movies) {
//     const {total_count, per_page, current_page, movies} = featureMovies;
//     const pages = Math.ceil(total_count / per_page)
//     const prevPage = current_page > 1 ? current_page - 1 : null;
//     const nextPage = current_page < pages;
//     let customPages = current_page + 1;
//     while(customPages < current_page + 3 && customPages < pages) {
//       console.log(customPages)
//       customPages ++
//     }
//     content = (
//       <ul className="flex flex-row justify-center list-none flex-wrap">
//         {movies.map((item) => {
//           return <MovieItem key={item.id} item={item} />;
//         })}
//       </ul>
//     );
//   }

//   return (
//     <section className="min-h-[250px] bg-white/5 px-4 py-6">
//       <h2 className="text-center text-2xl py-2 mb-3 font-bold border-b-2 border-yellow-400 w-fit mx-auto ">
//         Movies
//       </h2>
//       {content}
//     </section>
//   );
// };

// export default MoviesPage;

import React, { useState } from "react";
import { useLocation, useNavigate   } from "react-router-dom";
import { useGetFilteredMoviesQuery } from "../redux/services/movieApi";
import Spinner from "../components/UI/Spinner";
import MovieItem from "../components/Movies/MovieItem";

const MoviesPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate ();

  const currentPage = Number(queryParams.get("page")) || 1;
  const limit = Number(queryParams.get("limit")) || 10;

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

  const handlePageChange = (newPage: number | null) => {
    if (typeof newPage === "number") {
      // Update the URL with the new page number
      queryParams.set("page", newPage.toString());
      navigate(`?${queryParams.toString()}`);
    }
  };

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (isError) {
    // ... (your error handling code)
  } else if (isSuccess && featureMovies.movies) {
    const { total_count, per_page, current_page, movies } = featureMovies;
    const pages = Math.ceil(total_count / per_page);
    const prevPage = current_page > 1 ? current_page - 1 : null;
    const nextPage = current_page < pages;

    const range = 5; // Number of pagination buttons to show on each side of the "..."
    const buttonsToShow = 3; // Number of specific pagination buttons to show

    const startPage = Math.max(1, current_page - range);
    const endPage = Math.min(pages, current_page + range);

    const specificPages = Array.from(
      { length: Math.min(buttonsToShow, endPage) },
      (_, index) => startPage + index
    );

    content = (
      <>
        <ul className="flex flex-row justify-center list-none flex-wrap">
          {movies.map((item) => {
            return <MovieItem key={item.id} item={item} />;
          })}
        </ul>
        <div className="flex justify-center my-4">
          <button
            onClick={() => handlePageChange(prevPage)}
            disabled={!prevPage}
            className="mr-2"
          >
            Previous
          </button>
          {specificPages.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`mx-1 ${
                pageNumber === current_page ? "font-bold" : ""
              }`}
            >
              {pageNumber}
            </button>
          ))}
          {endPage > buttonsToShow && (
            <>
              <span className="mx-1">...</span>
              <button
                onClick={() => handlePageChange(endPage)}
                className={`mx-1 ${pages === current_page ? "font-bold" : ""}`}
              >
                {endPage}
              </button>
            </>
          )}
          <button
            onClick={() => handlePageChange(current_page + 1)}
            disabled={!nextPage}
            className="ml-2"
          >
            Next
          </button>
        </div>
      </>
    );
  }

  return (
    <section className="min-h-[250px] bg-white/5 px-4 py-6">
      <h2 className="text-center text-2xl py-2 mb-3 font-bold border-b-2 border-yellow-400 w-fit mx-auto ">
        Movies
      </h2>
      {content}
    </section>
  );
};

export default MoviesPage;
