const baseUrl = import.meta.env.VITE_API_BASE_URL;

const SingleMoviePage = () => {
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
            <button className="text-sm bg-lime-500 px-4 py-2 rounded-sm">
              Add Favorite
            </button>
            <button className="text-sm bg-lime-500 px-4 py-2 rounded-sm">
              Add Rating
            </button>
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
            tempora dolore ex dicta recusandae excepturi at. Esse voluptates
            eius quod maxime a nesciunt, quidem ipsa velit quos doloremque hic.
      </p>
      <div className="flex gap-6 justify-center mt-6 flex-wrap-reverse">
        <form className="w-full md:w-[45%] flex flex-col gap-2 bg-black/50 p-4">
          <h4>Add a new Comment</h4>
          <div>

          <input type="text" name="name" className="w-full px-4 py-2" />
          </div>
          <div>

          <textarea name="name"></textarea>
          </div>
          <button className="block ms-auto w-fit text-sm bg-lime-500 px-4 py-2 rounded-sm">Submit</button>
        </form>
        <div className="flex-grow bg-white/5 p-4">
        <h4 className="text-center text-lg font-bold border-b-2 border-yellow-500 py-2 mb-4">Recent Comments (10)</h4>
        <ul className="list-none md: h-[400px] overscroll-y-auto">
          <li>fjkdlfdkflkdflkdfkl</li>
          <li>jfkldjfkdjfkd</li>
          <li>jfkldjfkdjfkd</li>
          <li>jfkldjfkdjfkd</li>
          <li>jfkldjfkdjfkd</li>
        </ul>
        </div>
      </div>
    </article>
  );
};

export default SingleMoviePage;
