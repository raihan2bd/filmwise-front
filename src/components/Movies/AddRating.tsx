import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateRatingMutation } from "../../redux/services/movieApi";
import { useAppDispatch, useAppSelector } from "../../hooks/typeHooks";
import { logoutAction } from "../../redux/features/authSlice";

interface RatingProps {
  maxStars: number;
  setShowRatingModal: React.Dispatch<React.SetStateAction<boolean>>;
  movieId: number;
}

const AddRating: React.FC<RatingProps> = ({
  maxStars = 10,
  setShowRatingModal,
  movieId,
}) => {
  const [createRating, { isLoading }] = useCreateRatingMutation();
  const [hasError, setHasError] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(1);

  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1);
  };

  const handleAddRating = async () => {
    if (rating === null) {
      return;
    }

    try {
      const ratingInput: RatingInputType = {
        movie_id: movieId,
        rating: rating,
      };
      
      await createRating(ratingInput).unwrap();

      setShowRatingModal(false)
    } catch (err) {
      const error = err as CustomErrorType
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

  const handleCancel = () => {
    setShowRatingModal(false);
  };

  useEffect(() => {
    if(!user) {
      navigate(`/auth?callback=${pathname}${search}`);
    }
  }, [user])

  return (
    <>
      <div className="rating flex-col items-center justify-center w-fit mx-auto text-center">
        {hasError && (
          <p className="pb-2 text-red-500 p-2 text-center text-sm">
            {hasError}
          </p>
        )}
        {Array.from({ length: maxStars }, (_, index) => (
          <span
            key={index}
            className={`star text-3xl cursor-pointer ${
              index < (rating || 0) ? "text-yellow-400" : "text-gray-400"
            }`}
            onClick={() => handleStarClick(index)}
          >
            &#9733;
          </span>
        ))}
        <p className="rating-text ml-2">
          {rating !== null ? `${rating}/${maxStars} stars` : "Please rate"}
        </p>
      </div>
      <div className="w-full flex items-center justify-between mt-4">
        <button
          className="ml-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button
          className="ml-4 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleAddRating}
          disabled={rating === null || isLoading}
        >
          {isLoading ? "Loading..." : "Add Rating"}
        </button>
      </div>
    </>
  );
};

export default AddRating;
