import { FormEvent, useEffect } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword, validateFullName } from '../../utils/validator';
import useInput from '../../hooks/useInput'; // Import the useInput hook
import { useAppSelector } from '../../hooks/typeHooks';

type PropsType = {
  onSubmitHandler: (name: string, email: string, password: string) => void;
  redirectUrl: string | null;
};

const SignupForm = ({ onSubmitHandler, redirectUrl }: PropsType) => {
  // Define validation functions for email and password
  const userId = useAppSelector((state) => state.auth.userId)
  const navigate = useNavigate()

  const validateNameInput = (value: string) => {
    const isName = validateFullName(value);
    return isName.isValid ? null : isName.errorMsg || 'Invalid Name!';
  };

  const validateEmailInput = (value: string) => {
    const isEmail = validateEmail(value);
    return isEmail.isValid ? null : isEmail.errorMsg || 'Invalid Email!';
  };

  const validatePasswordInput = (value: string) => {
    const isPassword = validatePassword(value);
    return isPassword.isValid ? null : isPassword.errorMsg || 'Invalid Password!';
  };

  // Initialize useInput for name, email and password
  const {
    value: name,
    errorMsg: nameError,
    isTouched: isNameTouched,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(validateNameInput);
  
  const {
    value: email,
    errorMsg: emailError,
    isTouched: isEmailTouched,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(validateEmailInput);

  const {
    value: password,
    errorMsg: passwordError,
    isTouched: isPasswordTouched,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(validatePasswordInput);

  let formIsValid = false

  if(!emailError && !passwordError) {
    formIsValid = true
  }

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the form is valid
    if (formIsValid) {
      onSubmitHandler(name, email, password);
    }
  };

  useEffect(() => {
    if(userId) {
      navigate(redirectUrl? `/auth?callback=${redirectUrl}`: '/auth', {replace: true})
    }
  }, [userId])

  return (
    <form
      className="w-full max-w-[750px] flex flex-col gap-1 bg-white/5 text-white p-4 rounded-lg"
      onSubmit={formSubmitHandler}
    >
      <h3 className="text-center text-white text-2xl font-bold my-2">
        Create a new accrount
      </h3>
      <Input
        name="name"
        label="Name"
        inputError={isNameTouched? nameError : null}
        type="text"
        value={name}
        onChange={nameChangeHandler}
        onBlur={nameBlurHandler}
        placeholder="Enter your fullname here."
      />
      <Input
        name="email"
        label="Email"
        inputError={isEmailTouched? emailError : null}
        type="email"
        value={email}
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        placeholder="Enter your email here."
      />
      <Input
        type="password"
        label="Password"
        name="password"
        inputError={isPasswordTouched ? passwordError : null}
        value={password}
        onChange={passwordChangeHandler}
        onBlur={passwordBlurHandler}
        placeholder="Enter your password here."
      />
      <Button type="submit" btnClass="mt-4 text-xl" disabled={!formIsValid}>
        Signup
      </Button>
      <p className="bg-black/50 p-4 text-center">
        If you already have an accrount please{' '}
        <Link className="text-sky-500 font-bold" to={`${redirectUrl? `/auth?callback=${redirectUrl}`: '/auth'}`}>
          Login
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;
