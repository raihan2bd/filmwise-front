import { createSlice } from '@reduxjs/toolkit'

const initialState: AuthStateType = {
  user: {
    id: '1',
    role: 'admin',
    name: 'admin',
    token: 'jfkdfkdfkdfkdk'
  }
}

const authSlice = createSlice({
  name: 'auth-slice',
  initialState,
  reducers: {}
})


export default authSlice.reducer;