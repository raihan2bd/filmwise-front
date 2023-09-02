import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootStoreType } from '../redux/store'

import LoginForm from '../components/Auth/LoginForm'

const AuthPage = () => {
  const user = useSelector((state: RootStoreType) => state.auth.user)

  const navigate = useNavigate();

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const isLogIn = queryParams.get('is_login')? true : false


  const handleLogin = (email: string, password: string) => {
    console.log("I am login", email, password)
  }

  useEffect(() => {
    if(user?.id) {
      
      navigate(queryParams.get("callback") || '/', {replace: true})
      return
    }
  }, [])


  return (
    <div className="min-h-[87vh] flex flex-col justify-center items-center">
      {isLogIn && <LoginForm isLogin={isLogIn} onSubmitHandler={handleLogin} />}
    </div>
  )
}

export default AuthPage