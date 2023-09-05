import { useEffect, useState } from 'react'

interface PropsType {
  movieId: number | null;
}

const AddOrUpdateMovie = ({movieId}: PropsType) => {
  const [movieForm, setMovieForm] = useState({})


  useEffect(() => {
    if(movieId) {
      // call the back-end and update the form
      setMovieForm(prevState => {
        return {...prevState, title: "NEw Movie"}
      })
    }
  }, [movieId])

  return (
    <form>
      <h3>{movieId? "Update Movie" : "New Movie"}</h3>
    </form>
  )
}

export default AddOrUpdateMovie