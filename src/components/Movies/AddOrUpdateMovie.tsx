import React, { useEffect, useState } from 'react'
import Input from '../UI/Input';
import Button from '../UI/Button';
import useInput from '../../hooks/useInput';
import { validateTitle, validateMovieYear, validateRuntime  } from '../../utils/validator';
import { useAddNewMovieMutation } from '../../redux/services/movieApi';
import { useGetAllGenresQuery } from '../../redux/services/genresApi';

interface PropsType {
  movieId: number | null;
}

const AddOrUpdateMovie = ({movieId}: PropsType) => {
  const [movieForm, setMovieForm] = useState({})
  // const [Genres, setGenres] = useState(second)
  // const [title, setTitle] = useState('')

  const [addNewMovie, {isLoading: loadingNewMovie}] = useAddNewMovieMutation()
  const {data: genres } = useGetAllGenresQuery()
const [ReleaseDate, setReleaseDate] = useState("")


  const validateTitleInput = (value: string) => {
    const isTitle = validateTitle(value);
    return isTitle.isValid ? null : isTitle.errorMsg || 'Invalid Title!';
  };

  const validateYear = (value: string | null) => {
    const isYear = validateMovieYear(parseInt(value!));
    return isYear.isValid ? null : isYear.errorMsg || 'Invalid Year!';
  }

  const validateRuntimeInput = (value: string | null) => {
    const isRuntime = validateRuntime(parseInt(value!));
    return isRuntime.isValid ? null : isRuntime.errorMsg || 'Invalid Runtime!';
  }

  const {
    value: title,
    errorMsg: titleError,
    isTouched: istitleTouched,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
  } = useInput(validateTitleInput);

  const {
    value: description,
    errorMsg: descriptionError,
    isTouched: isDescriptionTouched,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
  } = useInput(validateTitleInput);

  const {
    value: year,
    errorMsg: yearError,
    isTouched: isYearTouched,
    valueChangeHandler: yearChangeHandler,
    inputBlurHandler: yearBlurHandler,
  } = useInput(validateYear)

  const {
    value: runtime,
    errorMsg: runtimeError,
    isTouched: isRuntimeTouched,
    valueChangeHandler: runtimeChangeHandler,
    inputBlurHandler: runtimeBlurHandler,
  } = useInput(validateRuntimeInput)

  let formIsValid = false

  if(!titleError && !descriptionError) {
    formIsValid = true
  }
  // if(!titleError && !passwordError) {
  //   formIsValid = true
  // }
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value)
    const date = new Date (e.target.value)
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const formattedDate = `${date.getFullYear()}-${month}-${day}`
    setReleaseDate(formattedDate.toString())
  }


  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!formIsValid) {
      return
    }


    const newMovie: MovieInputType = {
      title: title,
      description: description,
      runtime: runtime,
      release_date: ReleaseDate,
      genres: {
        "3": "Action",
        "5": "Sci-Fi"
      },
      image_id: "1",
      year: ReleaseDate
    }

    try {
      const response = await addNewMovie(newMovie).unwrap()
      console.log(response)
    } catch (err) {
      const error = err as CustomErrorType
      console.log(error)
    }
  }




  useEffect( () => {
    if(movieId) {
      // call the back-end and update the form
      setMovieForm(prevState => {
        return {...prevState, title: "NEw Movie"}
      })
    }
  }, [movieId])

  return (
    <form className="w-[800px] max-w-[100%] p-4 bg-white/10" onSubmit={handleOnSubmit}>
      <h3 className="text-2xl text-center my-2 font-bold">{movieId? "Update Movie" : "New Movie"}</h3>
      <Input name="title" label='Title' placeholder="Enter the movie title here" type="text" onChange={titleChangeHandler} inputError={istitleTouched? titleError : null} value={title} onBlur={titleBlurHandler} />
      <Input name='Description' label="Description" placeholder="Enter the movie description here" type='text' value={description} onChange={descriptionChangeHandler} inputError={isDescriptionTouched? descriptionError : null} onBlur={descriptionBlurHandler} />
      {/* <input type='number' /> */}
      {/* <Input type='number' label='Year' name='Year' /> */}
      <Input
         name='Year'
         label="Year"
         placeholder="Enter Year of movie release (e.g., 2023)"
         type='number'
         value={year}
         pattern='[1950-2023]'
         inputError={isYearTouched ? yearError : null}
         onBlur={yearBlurHandler}
          onChange={yearChangeHandler}
       />
        <Input name='Runtime' label="Runtime" placeholder="Enter the movie runtime here" type='number' value={runtime} onChange={runtimeChangeHandler} inputError={isRuntimeTouched? runtimeError : null} onBlur={runtimeBlurHandler} />
       <Input 
          name="Release Date"
          label="Release Date"
          placeholder="Enter the movie release date here"
          type="date"
          onChange={handleDateChange}
        />
        <label>Genres</label>
        <select
         name="Genres"
         id="Genres"
         className="bg-white/10 w-[100%] flex-grow flex-shrink p-2 text-white/50 rounded my-5 ">
          <option value="" >Select Genres</option>
        {genres?.genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
           {genre.genre_name}
          </option>
        ))}
        </select>
      

      <Button disabled={!formIsValid || loadingNewMovie} btnClass="my-3 block ms-auto" type='submit'>Submit</Button>
    </form>
  )
}

export default AddOrUpdateMovie