import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import noThambnail from "../../assets/images/no_thumbnail.jpg";
import { Link } from "react-router-dom";

import './MoviesCarousel.css'

type PropsType = {
  movies: MovieType[];
};

const MoviesCarousel = ({ movies }: PropsType) => {
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
    1280: { items: 4 },
  };

  const items = movies.map((item: MovieType) => {
    return (
      <div
        key={item.id}
        className="item bg-white/10 m-2 flex flex-col gap-3"
        data-value={item.id}
      >
        <div className="overflow-hidden max-w-[100%]">
          <img
            className="max-h-[400px] w-full"
            src={item.image ? item.image : noThambnail}
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
      </div>
    );
  });

  return (
    <div className="w-full relative movies_carousel">
      <AliceCarousel mouseTracking items={items} responsive={responsive} />
    </div>
  );
};

export default MoviesCarousel;
