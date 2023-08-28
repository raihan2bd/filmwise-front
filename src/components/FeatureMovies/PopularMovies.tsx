import {useGetPopularMoviesQuery} from '../../redux/services/featureMoviesApi'
import Spinner from '../UI/Spinner';

import MoviesCarousel from './MoviesCarousel';

const PopularMovies = () => {

  const {isLoading, isSuccess, isError, data: featureMovies, error} = useGetPopularMoviesQuery()

  let content;
  if(isLoading) {
    content = <Spinner />
  } else if(isError) {
    let errorMessage;

    if ('data' in error && error.data) {
      errorMessage = error.data.error.message;
    } else {
      errorMessage = 'An unknown error occurred. Please try again.';
    }

    content = <p className="text-red-500 text-lg shadow">{errorMessage}</p>
  } else if(isSuccess && featureMovies.movies) {
    console.log(featureMovies)
    content = <MoviesCarousel movies={featureMovies.movies} />
  }

  return (
    <div className="min-h-[100px] flex flex-col justify-center items-center">{content}</div>
  )
}

export default PopularMovies;