import { Link } from "react-router-dom"
import FavoriteSVG from "../UI/FavoriteSVG"
import { useManageFavoriteMutation } from "../../redux/services/movieApi"
import { useAppDispatch, useAppSelector } from "../../hooks/typeHooks"
import { useLocation, useNavigate } from "react-router-dom"
import { logoutAction } from "../../redux/features/authSlice"

import Button from "../UI/Button"

interface MovieCarouselItemProps {
  item: MovieType
}

const baseApiUrl = import.meta.env.VITE_API_BASE_URL

const MovieCarouselItem = ({item}: MovieCarouselItemProps) => {
  const [manageFavorite, {isLoading: isFavLoading}] = useManageFavoriteMutation()

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const handleAddFavorite = async (id: number) => {
    if (!user) {
      navigate(`/auth?callback=${pathname}${search}`);
      return;
    }

    try {
      await manageFavorite({movie_id: id}).unwrap()
    } catch (error) {
      const err = error as CustomErrorType
      let errMsg = 'something went wrong. please try again!'
      if(err.status && err.status === 401) {
        dispatch(logoutAction())
      }

      if(err.data.error.message) {
        errMsg = err.data.error.message
      }

      // call the ui action later
      console.log(errMsg)
    }
    
  }


  return (
    <div
        className="item bg-white/10 m-2 flex flex-col gap-3"
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
          <p className="flex justify-center items-center gap-1">
            <Button disabled={isFavLoading} onClick={() => handleAddFavorite(item.id)} btnClass="bg-transparent text-2xl text-red-500 hover:bg-white/50 active:bg-white/50 p-2 hover:text-white active:text-white">
            {item.is_favorite ? (
              <FavoriteSVG isFavorite={true} />
            ) : (
              <FavoriteSVG isFavorite={false} />
            )}
            </Button>
            <span>{item.total_favorites}</span>
          </p>
          <p>Comment: {item.total_comments}</p>
        </div>
      </div>
  )
}

export default MovieCarouselItem