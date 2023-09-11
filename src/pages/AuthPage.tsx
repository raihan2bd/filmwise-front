import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {fetchSignup, fetchLogin} from '../redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '../hooks/typeHooks';

import LoginForm from '../components/Auth/LoginForm'
import SignupForm from '../components/Auth/SignupForm'

const AuthPage = () => {
  const user = useAppSelector((state) => state.auth.user)

  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const isSignup = queryParams.get('signup')? true : false
  const redirectUrl = queryParams.get("callback")|| '/'


  const handleLogin = (email: string, password: string) => {
    dispatch(fetchLogin({email, password}))
  }

  const handleSignup = (name: string, email: string, password: string) => {
    const userPayload: UserSignupDataType =  {
      full_name: name, email, password
    }
    dispatch(fetchSignup(userPayload))
  }

  useEffect(() => {
    // Check if the user is authenticated (user?.id is truthy)
    if (user?.id) {
      // Redirect to the specified URL
      navigate(redirectUrl, { replace: true });
    }
    // Ensure that this effect runs when 'user' changes
  }, [user, redirectUrl]);
  


  return (
    <div className="min-h-[87vh] flex flex-col justify-center items-center py-6">
      {!isSignup && <LoginForm onSubmitHandler={handleLogin} redirectUrl={redirectUrl} />}
      {isSignup && <SignupForm onSubmitHandler={handleSignup} redirectUrl={redirectUrl} />}
    </div>
  )
}

export default AuthPage