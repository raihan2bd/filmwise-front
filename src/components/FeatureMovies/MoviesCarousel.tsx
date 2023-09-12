import AliceCarousel from "react-alice-carousel";
import MovieCarouselItem from "./MovieCarouselItem";

import "react-alice-carousel/lib/alice-carousel.css";
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
      <MovieCarouselItem key={item.id} item={item} />
    );
  });

  return (
    <div className="w-full relative movies_carousel">
      <AliceCarousel mouseTracking items={items} responsive={responsive} />
    </div>
  );
};

export default MoviesCarousel;
