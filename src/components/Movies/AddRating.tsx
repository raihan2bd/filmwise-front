import React, { useState } from "react";

interface RatingProps {
  maxStars: number;
  onAddRating: (rating: number) => void;
  onCancel: () => void;
}

const AddRating: React.FC<RatingProps> = ({
  maxStars,
  onAddRating,
  onCancel,
}) => {
  const [rating, setRating] = useState<number | null>(1);

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1);
  };

  const handleAddRating = () => {
    if (rating !== null) {
      onAddRating(rating);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
    <div className="rating flex-col items-center justify-center w-fit mx-auto text-center">
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
          disabled={rating === null}
        >
          Add Rating
        </button>
      </div>
    </>
    
  );
};

export default AddRating;
