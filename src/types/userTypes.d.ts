interface UserType {
  id: string,
  name: string,
  role: string,
  token: string,
}

interface AuthStateType {
  user: UserType | null
}