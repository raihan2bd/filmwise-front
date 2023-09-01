import { useRef, useState } from "react";

import Button from "../components/UI/Button";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const SingleMoviePage = () => {
  const commentText = useRef<HTMLTextAreaElement | null>(null);
  const [isFormError, setIsFormError] = useState<Boolean>(false)

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = commentText?.current?.value;
    if (!value) {
      commentText.current?.focus()
      setIsFormError(true)
      return;
    }
    if (!(value.length > 1)) {
      commentText.current?.focus()
      setIsFormError(true)
      return;
    }

    console.log(value)
  };

  return (
    <article className="p-4 bg-white/10">
      <div className="flex flex-col md:flex-row flex-wrap gap-4 items-center md:items-start">
        <div className="max-w-[100%] md:max-w-[65%] flex flex-col items-center overflow-hidden">
          <img
            className="max-w-[100%] h-auto"
            src={`${baseUrl}/image/no-thumb.jpg`}
            alt="djfkdfkd"
          />
        </div>
        <div className="flex flex-col gap-4 w-full md:w-[33%] flex-grow">
          <h3 className="text-2xl text-yellow-500 font-extrabold p-4">
            Movie Title Here (2023)
          </h3>
          <p className="flex justify-between gap-2 bg-white/5 p-4">
            <Button>Add Favorite</Button>
            <Button>Add Rating</Button>
          </p>
          <p className="flex flex-wrap justify-between gap-2 bg-black/50 p-4">
            <span>Favorite: </span> 0
          </p>
          <p className="flex justify-between gap-2 bg-black/50 p-4">
            <span>Rating: </span> 7.5
          </p>
          <div className="flex flex-wrap justify-between gap-2 bg-black/50 p-4">
            Categories:{" "}
            <ul className="flex flex-wrap justify-center gap-2 list-none">
              <li className="bg-white/5 rounded p-2">Action</li>
              <li className="bg-white/5 rounded p-2">Drama</li>
            </ul>
          </div>
          <p className="flex justify-between gap-2 bg-white/5 p-4">
            <span>Relese Date:</span> 2023-09-01
          </p>
          <p className="flex justify-between gap-2 bg-black/50 p-4">
            <span>RunTime: </span> 255 min
          </p>

          <p className="flex flex-wrap justify-between gap-2 bg-white/5 p-4">
            <span>Comment:</span> 0
          </p>
        </div>
      </div>
      <p className="flex flex-col justify-between gap-1 bg-white/5 p-4 mt-4 text-sm">
        <span className="text-base">Description: </span>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum cum
        tempora dolore ex dicta recusandae excepturi at. Esse voluptates eius
        quod maxime a nesciunt, quidem ipsa velit quos doloremque hic.
      </p>
      <div className="flex flex-col gap-6 justify-center mt-6 md:flex-row">
        <form
          onSubmit={handleCommentSubmit}
          className="w-full flex flex-col gap-2 bg-black/50 p-4 justify-center"
        >
          <h4 className="text-center text-lg font-bold text-white/80">
            Add a new Comment
          </h4>
          <div>
            {isFormError && <p className="mb-3 p-4 text-red-500">Comment text is required! Make sure the comment text is greater than 2 character.</p>}
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

        <div className="bg-white/5 p-4 md:h-[400px] overflow-y-scroll">
          <h4 className="text-center text-lg font-bold border-b-2 border-yellow-500 py-2 mb-4">
            Recent Comments (10)
          </h4>

          <ul className="list-none">
            <li className="flex flex-col gap-1 bg-black/50 rounded my-3">
              <h4 className="flex justify-between px-4 py-2 border-b border-white/20">
                <span>Abu Raihan</span>{" "}
                <span className="text-sm text-white/70">26 jan 2023</span>
              </h4>
              <p
                className="break-words p-4 pt-2"
                style={{ wordBreak: "break-all" }}
              >
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Numquam accusamus voluptatibus voluptas necessitatibus similique
                hic quibusdam, error inventore cum, dolore ex rem aliquam
                dolores odio corporis cumque ducimus pariatur sed?
              </p>
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
};

export default SingleMoviePage;
