import { FormEvent } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { Link } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../utils/validator';
import useInput from '../../hooks/useInput'; // Import the useInput hook

type PropsType = {
  isLogin: boolean;
  onSubmitHandler: (email: string, password: string) => void;
};

const LoginForm = ({ isLogin, onSubmitHandler }: PropsType) => {
  // Define validation functions for email and password
  const validateEmailInput = (value: string) => {
    const isEmail = validateEmail(value);
    return isEmail.isValid ? null : isEmail.errorMsg || 'Invalid Email!';
  };

  const validatePasswordInput = (value: string) => {
    const isPassword = validatePassword(value);
    return isPassword.isValid ? null : isPassword.errorMsg || 'Invalid Password!';
  };

  // Initialize useInput for email and password
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
      onSubmitHandler(email, password);
    }
  };

  return (
    <form
      className="w-full max-w-[750px] flex flex-col gap-1 bg-white/5 text-white p-4 rounded-lg"
      onSubmit={formSubmitHandler}
    >
      <h3 className="text-center text-white text-2xl font-bold my-2">
        Login to your account
      </h3>
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
        {isLogin ? 'Login' : 'Signup'}
      </Button>
      <p className="bg-black/50 p-4 text-center">
        If you don't have an account, please{' '}
        <Link className="text-sky-500 font-bold" to="/auth">
          Signup.
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
