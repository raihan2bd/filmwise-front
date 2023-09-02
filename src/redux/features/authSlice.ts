import { createSlice } from '@reduxjs/toolkit'

const initialState: AuthStateType = {
  user: null
}

const authSlice = createSlice({
  name: 'auth-slice',
  initialState,
  reducers: {}
})


export default authSlice.reducer;