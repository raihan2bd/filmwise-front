import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import jwtDecode from "jwt-decode";

const baseApiUrl = import.meta.env.VITE_API_BASE_URL;

const logout = () => {
  localStorage.removeItem("user");
  return {
    user: null,
    userId: null,
  };
};

export const retriveToken = createAsyncThunk("auth/retrive-token", () => {
  const userData = localStorage.getItem("user");
  if (!userData) {
    return logout();
  }

  const user: UserType = JSON.parse(userData);
  if (!user) {
    return logout();
  }

  const currentTimestamp = Math.floor(Date.now() / 1000);

  if (user.expirationTime < currentTimestamp + 300) {
    return logout();
  }

  return {
    user: user,
  };
});

export const fetchLogin = createAsyncThunk(
  "auth/Login",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${baseApiUrl}/user/login/`, {
        email,
        password,
      });

      const token = response.data.token;
      const decodedToken: {
        name: string;
        user_type: string;
        sub: string;
        aud: string;
        exp: number;
        iat: number;
        iss: number;
        nbf: number;
      } = jwtDecode(token);

      const user: UserType = {
        token,
        name: decodedToken.name,
        role: decodedToken.user_type,
        id: decodedToken.sub,
        expirationTime: decodedToken.exp,
      };

      localStorage.setItem("user", JSON.stringify(user));
      return {
        user,
        userId: null,
      };
    } catch (err) {
      const error: AxiosError<CustomAxiosErrorType | any> = err as any;
      let errMsg = "Something went wrong. Please try again.";
      const errResponse = error.response?.data;
      if (errResponse) {
        errMsg = errResponse.message;
      }
      console.log(errMsg);

      return;
    }
  }
);

export const fetchSignup = createAsyncThunk(
  "auth/sign-up",
  async (userPayload: UserSignupDataType) => {
    try {
      const response = await axios.post(
        `${baseApiUrl}/user/signup/`,
        userPayload
      );

      return { userId: response.data.id || 1 };
    } catch (err) {
      const error: AxiosError<CustomAxiosErrorType | any> = err as any;
      // Handle errors from the API without throwing an error
      const errorResponse = error.response?.data;
      let errorMsg = "Something went wrong. Please try again.";

      if (errorResponse.errors) {
        const objArr = Object.keys(errorResponse.errors);
        errorMsg = errorResponse.errors[objArr[0]];
      } else if (errorResponse.error.message) {
        errorMsg = errorResponse.error.message;
      }

      console.log(errorMsg);

      return {
        userId: null,
      };
    }
  }
);

// Handle the fetchSignup action in your slice or reducer

const initialState: AuthStateType = {
  user: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth-slice",
  initialState,
  reducers: {
    logoutAction() {
      localStorage.removeItem('user')
      return initialState
    }
  },
  extraReducers: (builder) => {

    builder.addCase(fetchSignup.fulfilled, (state, { payload }) => {
      if (payload.userId) {
        return { ...state, userId: payload.userId };
      }
      return initialState;
    });

    builder.addCase(fetchLogin.fulfilled, (state, { payload }) => {
      if (payload?.user) {
        const updatedState: AuthStateType = {
          ...state,
          user: payload.user,
          userId: payload.userId,
        };

        return updatedState;
      }

      return initialState;
    });

    builder.addCase(retriveToken.fulfilled, (state, { payload }) => {
      if (payload?.user) {
        return {
          ...state,
          user: payload.user,
          userId: null,
        };
      }

      return initialState;
    });
  },
});

export const { logoutAction } = authSlice.actions

export default authSlice.reducer;
