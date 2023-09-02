import React, { useState } from 'react';
import { FormEvent } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { Link } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../utils/validator';

type PropsType = {
  isLogin: boolean;
  onSubmitHandler: (email: string, password: string) => void;
};

const LoginForm = ({ isLogin, onSubmitHandler }: PropsType) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailError, setIsEmailError] = useState<string | null>(null);
  const [isPasswordError, setIsPasswordError] = useState<string | null>(null);
  const [isFormTouched, setIsFormTouched] = useState(false);

  // Function to validate the form fields
  const validateForm = () => {
    const isEmail = validateEmail(email);
    const isPassword = validatePassword(password);
    setIsEmailError(isEmail.isValid ? null : isEmail.errorMsg || 'Invalid Email!');
    setIsPasswordError(isPassword.isValid ? null : isPassword.errorMsg || 'Invalid Password!');
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    setIsFormTouched(true);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    setIsFormTouched(true);
  };

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Set the form as touched
    setIsFormTouched(true)

    // Validate the form 
    
    validateForm();

    // Check if the form is valid
    if (!isEmailError && !isPasswordError) {
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
        inputError={isFormTouched ? isEmailError : null}
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter your email here."
        required
      />
      <Input
        type="password"
        label="Password"
        name="password"
        inputError={isFormTouched ? isPasswordError : null}
        value={password}
        onChange={handlePasswordChange}
        placeholder="Enter your password here."
        required
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
