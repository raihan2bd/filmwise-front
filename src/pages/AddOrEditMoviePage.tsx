import { useLocation } from 'react-router'

import AddOrUpdateMovie from '../components/Movies/AddOrUpdateMovie'

const AddOrEditMoviePage = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const movieId: number | null = Number(queryParams.get('movie_id'))
  return (
    <section className='min-h-[85vh] flex flex-col justify-center items-center'>
      <AddOrUpdateMovie movieId={movieId} />
    </section>
  )
}

export default AddOrEditMoviePage