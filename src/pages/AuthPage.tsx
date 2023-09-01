import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootStoreType } from '../redux/store'

const AuthPage = () => {
  const user = useSelector((state: RootStoreType) => state.auth.user)

  const navigate = useNavigate();

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const isLogIn = queryParams.get('is_login')

  useEffect(() => {
    if(user?.id) {
      
      navigate(queryParams.get("callback") || '/', {replace: true})
      return
    }
  }, [])


  return (
    <div>AuthPage</div>
  )
}

export default AuthPage