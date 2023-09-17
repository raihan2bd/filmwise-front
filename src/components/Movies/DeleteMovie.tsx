import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../redux/features/authSlice";
import { useDeleteAMovieMutation } from "../../redux/services/movieApi";
import { useAppDispatch } from "../../hooks/typeHooks";

interface RatingProps {
  setShowRatingModal: React.Dispatch<React.SetStateAction<boolean>>;
  movieId: number;
}

const DeleteMovie = ({ setShowRatingModal, movieId }: RatingProps) => {
  const [hasError, setHasError] = useState<string | null>(null);

  const [deleteAMovie, { isLoading }] = useDeleteAMovieMutation();
  const handleCancel = () => {
    setShowRatingModal(false);
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const deleteMovieHandler = async () => {
    try {
      const response = await deleteAMovie(movieId).unwrap();
      if ("id" in response) {
        navigate("/movies");
      }
      console.log(response);
    } catch (err) {
      const error = err as CustomErrorType;
      console.log(error);
      if (error.status === 401) {
        dispatch(logoutAction());
      } else {
        const errMsg =
          error.data?.error?.message ||
          "Something went wrong. Please try again.";
        setHasError(errMsg);
      }
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <p className="text-center text-lg">
        Are you sure you want to delete the movie?
      </p>
      {hasError && (
        <p className="text-sm text-red/500 text-center">{hasError}</p>
      )}

      <div className="w-full flex items-center justify-between mt-4">
        <button
          className="ml-4 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button
          className="ml-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={deleteMovieHandler}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Yes"}
        </button>
      </div>
    </div>
  );
};

export default DeleteMovie;
