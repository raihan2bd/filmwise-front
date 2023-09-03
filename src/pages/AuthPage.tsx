import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootStoreType } from '../redux/store'

import LoginForm from '../components/Auth/LoginForm'
import SignupForm from '../components/Auth/SignupForm'

const AuthPage = () => {
  const user = useSelector((state: RootStoreType) => state.auth.user)

  const navigate = useNavigate();

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const isSignup = queryParams.get('signup')? true : false
  const redirectUrl = queryParams.get("callback")


  const handleLogin = (email: string, password: string) => {
    console.log("I am login", email, password)
    navigate(redirectUrl || '/', {replace: true})
  }

  const handleSignup = (name: string, email: string, password: string) => {
    console.log("I'm signup", name, email, password)
    navigate(redirectUrl || '/', {replace: true})
  }

  useEffect(() => {
    if(user?.id) {
      
      navigate(redirectUrl || '/', {replace: true})
      return
    }
  }, [])


  return (
    <div className="min-h-[87vh] flex flex-col justify-center items-center py-6">
      {!isSignup && <LoginForm onSubmitHandler={handleLogin} redirectUrl={redirectUrl} />}
      {isSignup && <SignupForm onSubmitHandler={handleSignup} redirectUrl={redirectUrl} />}
    </div>
  )
}

export default AuthPage