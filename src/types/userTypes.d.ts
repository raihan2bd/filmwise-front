interface UserType {
  id: string,
  name: string,
  role: string,
  token: string,
  expirationTime: number,
}

interface AuthStateType {
  user: UserType | null
  userId: number | string | null
  hasLoginError: null | string
  hasSignupError: null | string
}

interface UserSignupDataType {
  full_name: string, 
  email: string, 
  password: string
}