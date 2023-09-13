import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/typeHooks";
import Button from "../UI/Button";
import { logoutAction } from "../../redux/features/authSlice";
import { useAddMovieCommentMutation } from "../../redux/services/movieApi";

type PropsType = {
  movieId: number
}

const AddCommentForm = ({movieId}: PropsType) => {
  const commentText = useRef<HTMLTextAreaElement | null>(null);
  const [isFormError, setIsFormError] = useState<Boolean>(false);
  
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const [addMovieComment, {isLoading: isCommentLoading}] = useAddMovieCommentMutation()

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.id) {
      navigate(`/auth?callback=${pathname}${search}`);
      return;
    }

    const value = commentText?.current?.value;
    if (!value) {
      commentText.current?.focus();
      setIsFormError(true);
      return;
    }
    if (!(value.length > 1)) {
      commentText.current?.focus();
      setIsFormError(true);
      return;
    }

    try {
      const response = await addMovieComment({movie_id: movieId, comment: value}).unwrap()
      console.log(response)

    } catch (error) {
      const err = error as CustomErrorType
      console.log(err)
      let errMsg = 'something went wrong. please try again.'
      if(err.status && err.status === 401) {
        dispatch(logoutAction())
      }
      if(err.data.error.message) {
        errMsg = err.data.error.message
      }
      console.log(errMsg)
    }
  };

  return (
    <form
      onSubmit={handleCommentSubmit}
      className="w-full flex flex-col gap-2 bg-black/50 p-4 justify-center"
    >
      <h4 className="text-center text-lg font-bold text-white/80">
        Add a new Comment
      </h4>
      <div>
        {isFormError && (
          <p className="mb-3 p-4 text-red-500">
            Comment text is required! Make sure the comment text is greater than
            2 character.
          </p>
        )}
        <textarea
          placeholder="Place your comment text here!"
          rows={4}
          name="message"
          id="message"
          className="w-full px-4 py-2 text-white bg-white/20"
          ref={commentText}
        ></textarea>
      </div>
      <Button disabled={isCommentLoading} btnClass="text-base py-3" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default AddCommentForm;
