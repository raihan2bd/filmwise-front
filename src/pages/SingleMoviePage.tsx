import { useMemo, useCallback, useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/typeHooks";
import { useGetSingleMovieQuery, useManageFavoriteMutation } from "../redux/services/movieApi";
import {logoutAction} from '../redux/features/authSlice'

import Spinner from "../components/UI/Spinner";
import Button from "../components/UI/Button";
import AddCommentForm from "../components/Movies/AddCommentForm";
import { formatDateDefault } from "../utils/utils";
import Modal from "../components/UI/Modal";
import AddRating from "../components/Movies/AddRating";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const SingleMoviePage = () => {
  const [showRatingModal, setShowRatingModal] = useState(false);

  const [manageFavorite, {isLoading: isFavLoading}] = useManageFavoriteMutation()
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const user = useAppSelector((state) => state.auth.user);
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    isSuccess,
    data: movieResponse,
    error,
  } = useGetSingleMovieQuery(Number(id));

  const hideRatingModalHandler = () => {
    setShowRatingModal(false);
  };

  const showRatingModalHandler = () => {
    if (!user || !user.id) {
      navigate(`/auth?callback=${pathname}${search}`);
      return;
    }
    setShowRatingModal(true);
  };

  const deleteMovieHandler = (id: number) => {
    console.log(id);
  };

  const editMovieHandler = (id: number) => {
    console.log(id);
  };

  const handleAddFavorite = async (id: number) => {
    if (!user) {
      navigate(`/auth?callback=${pathname}${search}`);
      return;
    }

    try {
      await manageFavorite(id).unwrap()
    } catch (error) {
      const err = error as CustomErrorType
      let errMsg = 'something went wrong. please try again!'
      if(err.status && err.status === 401) {
        dispatch(logoutAction())
      }

      if(err.data.error.message) {
        errMsg = err.data.error.message
      }

      // call the ui action later
      console.log(errMsg)
    }
    
  }

  const handleAddComment = useCallback(
    (comTxt: string) => {
      if (!user?.id) {
        navigate(`/auth?callback=${pathname}${search}`);
        return;
      }
      console.log(comTxt);
    },
    [pathname, search]
  );

  const content = useMemo(() => {
    if (isLoading) {
      return <Spinner />;
    } else if (isError) {
      let errorMessage;
      const err = error as CustomErrorType;
      if (err.data.error.message) {
        errorMessage = err.data.error.message;
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
              {user?.role === "admin" && (
                <p className="flex justify-between gap-2 bg-white/5 p-4">
                  <Button
                    btnClass="bg-red-500"
                    onClick={() => deleteMovieHandler(movie.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    btnClass="bg-yellow-500"
                    onClick={() => editMovieHandler(movie.id)}
                  >
                    Edit
                  </Button>
                </p>
              )}

              <h3 className="text-2xl text-yellow-500 font-extrabold p-4">
                {movie.title} ({movie.year})
              </h3>

              <p className="flex justify-between gap-2 bg-white/5 p-4">
                <Button disabled={isFavLoading} btnClass={movie.is_favorite? 'bg-red-500': ''} onClick={() => handleAddFavorite(movie.id)}>
                  {!movie.is_favorite? 'Add Favorite': 'Remove Favorite'}
                </Button>
                <Button
                  onClick={showRatingModalHandler}
                >
                  Add Rating
                </Button>
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
                    <li className="bg-white/5 rounded" key={genreId}>
                      <Link className="p-2 block" to={`/genres/${genreId}`}>
                        {genreName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="flex justify-between gap-2 bg-white/5 p-4">
                <span>Relese Date:</span>{" "}
                {formatDateDefault(movie.release_date)}
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
              <AddCommentForm submitHandler={handleAddComment} />
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
                        {formatDateDefault(comment.commented_at)}
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
  }, [isLoading, isError, error, isSuccess, movieResponse, user]);

  return (
    <article className="p-4 bg-white/10">
      {content}
      {showRatingModal && movieResponse?.movie.id && (
        <Modal onHandleClick={hideRatingModalHandler}>
          <AddRating
            maxStars={10}
            setShowRatingModal={setShowRatingModal}
            movieId={movieResponse?.movie?.id}
          />
        </Modal>
      )}
    </article>
  );
};

export default SingleMoviePage;
