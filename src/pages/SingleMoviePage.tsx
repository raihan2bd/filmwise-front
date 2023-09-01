import {useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";

import { useGetSingleMovieQuery } from "../redux/services/movieApi";
import Spinner from "../components/UI/Spinner";
import Button from "../components/UI/Button";
import AddCommentForm from "../components/Movies/AddCommentForm";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const SingleMoviePage = () => {
  const { id } = useParams();

  const {
    isLoading,
    isError,
    isSuccess,
    data: movieResponse,
    error,
  } = useGetSingleMovieQuery(Number(id));

  const addCommentHandler = useCallback((comTxt: string) => {
    console.log(comTxt)
  }, [])

  const content = useMemo(() => {
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
    } else if (isSuccess && movieResponse.movie) {
      const { movie } = movieResponse;
      return (
        <>
          <div className="flex flex-col md:flex-row flex-wrap gap-4 items-center md:items-start">
            <div className="max-w-[100%] md:max-w-[65%] flex flex-col items-center overflow-hidden">
              <img
                className="max-w-[100%] h-auto"
                src={`${baseUrl}${movie.image}`}
                alt="djfkdfkd"
              />
            </div>
            <div className="flex flex-col gap-4 w-full md:w-[33%] flex-grow">
              <h3 className="text-2xl text-yellow-500 font-extrabold p-4">
                {movie.title} ({movie.year})
              </h3>
              <p className="flex justify-between gap-2 bg-white/5 p-4">
                <Button>Add Favorite</Button>
                <Button>Add Rating</Button>
              </p>
              <p className="flex flex-wrap justify-between gap-2 bg-black/50 p-4">
                <span>Favorite: </span> {movie.total_favorites}
              </p>
              <p className="flex justify-between gap-2 bg-black/50 p-4">
                <span>Rating: </span> {movie.rating}&#47;10
              </p>
              <div className="flex flex-wrap justify-between gap-2 bg-black/50 p-4">
                Categories:{" "}
                <ul className="flex flex-wrap justify-center gap-2 list-none">
                  {Object.entries(movie.genres).map(([genreId, genreName]) => (
                    <li className="bg-white/5 rounded p-2" key={genreId}>
                      {genreName}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="flex justify-between gap-2 bg-white/5 p-4">
                <span>Relese Date:</span> {movie.release_date}
              </p>
              <p className="flex justify-between gap-2 bg-black/50 p-4">
                <span>RunTime: </span> {movie.runtime} min
              </p>

              <p className="flex flex-wrap justify-between gap-2 bg-white/5 p-4">
                <span>Comment:</span> {movie.total_comments}
              </p>
            </div>
          </div>
          <p className="flex flex-col justify-between gap-1 bg-white/5 p-4 mt-4 text-sm">
            <span className="text-base">Description: </span>
            {movie.description}
          </p>
          <div className="flex flex-col gap-6 justify-center mt-6 md:flex-row">
            <div className="flex-1">

            <AddCommentForm submitHandler={addCommentHandler}/>
            </div>

            <div className="flex-1 bg-white/5 p-4 md:h-[400px] overflow-y-scroll">
              <h4 className="text-center text-lg font-bold border-b-2 border-yellow-500 py-2 mb-4">
                Recent Comments ({movie.total_comments})
              </h4>

              <ul className="list-none">
                {movie.comments?.map((comment) => (
                  <li
                    className="flex flex-col gap-1 bg-black/50 rounded my-3"
                    key={comment.id}
                  >
                    <h4 className="flex justify-between px-4 py-2 border-b border-white/20">
                      <span>{comment.user_name}</span>{" "}
                      <span className="text-sm text-white/70">
                        {comment.commented_at}
                      </span>
                    </h4>
                    <p
                      className="break-words p-4 pt-2"
                      style={{ wordBreak: "break-all" }}
                    >
                      {comment.comment}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      );
    }

    return (
      <p className="text-red-500 text-lg shadow text-center w-fit mx-auto px-4 py-2">
        No Movie Found!
      </p>
    );
  }, [isLoading, isError, error, isSuccess, movieResponse]);

  return (
    <article className="p-4 bg-white/10">
      {content}
    </article>
  );
};

export default SingleMoviePage;
