import { useState, useRef } from "react";
import Button from "../UI/Button";

type PropsType = {
  submitHandler: (comTxt: string) => void
}

const AddCommentForm = ({submitHandler}: PropsType) => {
  const commentText = useRef<HTMLTextAreaElement | null>(null);
  const [isFormError, setIsFormError] = useState<Boolean>(false);

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

    submitHandler(value)
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
      <Button btnClass="text-base py-3" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default AddCommentForm;
