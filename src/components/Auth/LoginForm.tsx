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
    isValid: isEmailValid,
    errorMsg: emailError,
    isTouched: isEmailTouched,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(validateEmailInput);

  const {
    value: password,
    isValid: isPasswordValid,
    errorMsg: passwordError,
    isTouched: isPasswordTouched,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(validatePasswordInput);

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the form fields
    emailBlurHandler(); // Mark email as touched
    passwordBlurHandler(); // Mark password as touched

    // Check if the form is valid
    if (isEmailValid && isPasswordValid) {
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
      <Button type="submit" btnClass="mt-4 text-xl">
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
