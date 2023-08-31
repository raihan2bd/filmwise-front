import { Link } from 'react-router-dom';

interface PropsType {
  item: MovieType
}

const MovieItem = ({item}: PropsType) => {
  const baseApiUrl = import.meta.env.VITE_API_BASE_URL
  return (
    <li
      className="item bg-white/10 m-2 flex flex-col gap-3 flex-grow max-w-[400px]"
      data-value={item.id}
    >
      <div className="overflow-hidden max-w-[100%]">
        <img
          className="max-h-[400px] w-full"
          src={`${baseApiUrl}${item.image}`}
          alt={item.title}
        />
      </div>
      <Link
        to={`/movies/${item.id}`}
        className="block text-center text-sky-500 font-bold pb-2"
      >
        {item.title} ({item.year})
      </Link>
      <p className="text-sm flex justify-between px-4">
        Rating:{" "}
        <span className="ps-3 text-yellow-600">{item.rating}&#47;10</span>
        <span className="ms-auto text-sky-600 text-lg">&#10027;</span>
      </p>
      <div className="flex flex-row justify-between items-center text-sm bg-black/30 px-4 py-2">
        <p className="">
          <button className="text-2xl text-red-500 hover:bg-red-500 active:bg-red-500 px-2 py-0 hover:text-white active:text-white">
            &#9825;
          </button>
          <span className="ps-2">{item.total_favorites}</span>
        </p>
        <p>Comment: {item.total_comments}</p>
      </div>
    </li>
  )
}

export default MovieItem