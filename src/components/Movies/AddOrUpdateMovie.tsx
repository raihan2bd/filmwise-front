import React, { useEffect, useState } from 'react'
import Input from '../UI/Input';
import Button from '../UI/Button';
import useInput from '../../hooks/useInput';
import { validateTitle } from '../../utils/validator';

interface PropsType {
  movieId: number | null;
}

const AddOrUpdateMovie = ({movieId}: PropsType) => {
  const [movieForm, setMovieForm] = useState({})
  // const [title, setTitle] = useState('')


  const validateTitleInput = (value: string) => {
    const isTitle = validateTitle(value);
    return isTitle.isValid ? null : isTitle.errorMsg || 'Invalid Title!';
  };

  const {
    value: title,
    errorMsg: titleError,
    isTouched: istitleTouched,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
  } = useInput(validateTitleInput);

  let formIsValid = false

  if(!titleError) {
    formIsValid = true
  }
  // if(!titleError && !passwordError) {
  //   formIsValid = true
  // }




  // const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   // const value = e.target.value
  //   setTitle(e.target.value)
  // }

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!formIsValid) {
      return
    }
    console.log(title)
  }




  useEffect(() => {
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
      <Button disabled={!formIsValid} btnClass="my-3 block ms-auto" type='submit'>Submit</Button>
    </form>
  )
}

export default AddOrUpdateMovie