import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { logoutAction } from "../../redux/features/authSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/typeHooks";
import { useManageFavoriteMutation } from "../../redux/services/movieApi";
import FavoriteSVG from "../UI/FavoriteSVG";

interface PropsType {
  item: MovieType;
}

const MovieItem = ({ item }: PropsType) => {
  const baseApiUrl = import.meta.env.VITE_API_BASE_URL;
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
      await manageFavorite(id).unwrap()
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
    <li
      className="item bg-white/10 m-2 flex flex-col gap-3 flex-grow max-w-[400px]"
      data-value={item.id}
    >
      <div className="overflow-hidden max-w-[100%] h-80">
        <img
          className="h-full w-full"
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
        <p className="flex justify-center items-center">
          <button onClick={() => handleAddFavorite(item.id)} disabled={isFavLoading} className="text-2xl text-red-500 hover:bg-red-500 active:bg-red-500 p-2 hover:text-white active:text-white">
            {item.is_favorite ? (
              <FavoriteSVG isFavorite={true} />
            ) : (
              <FavoriteSVG isFavorite={false} />
            )}
          </button>
          <span className="ps-2">{item.total_favorites}</span>
        </p>
        <p>Comment: {item.total_comments}</p>
      </div>
    </li>
  );
};

export default MovieItem;
