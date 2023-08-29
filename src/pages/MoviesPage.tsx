import { useGetFilteredMoviesQuery } from "../redux/services/movieApi";
import Spinner from "../components/UI/Spinner";
import MovieItem from "../components/Movies/MovieItem";


const MoviesPage = () => {
  const {isLoading, isSuccess, isError, data: featureMovies, error} = useGetFilteredMoviesQuery('movies?limit=4')

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
    content = featureMovies.movies.map(item => {
      return <MovieItem item={item}/>
    })
  }

  return (
    <section className="min-h-[250px] bg-white/5 px-4 py-6">
      <h2 className="text-center text-2xl py-2 mb-3 font-bold border-b-2 border-yellow-400 w-fit mx-auto ">Movies</h2>
      <ul className="flex flex-row justify-center list-none flex-wrap">{content}</ul>
    </section>
  )
}

export default MoviesPage