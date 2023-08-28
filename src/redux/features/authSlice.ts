import { createSlice } from '@reduxjs/toolkit'

export interface UserType {
  id: string,
  name: string,
  role: string,
}

interface AuthStateType {
  user: UserType | null
}

const initialState: AuthStateType = {
  user: null
}

const authSlice = createSlice({
  name: 'auth-slice',
  initialState,
  reducers: {}
})


export default authSlice.reducer;