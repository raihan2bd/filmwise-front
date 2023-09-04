import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  hasError: false,
  message: null,
};

const uiSlice = createSlice({
  name: 'ui-slice',
  initialState,
  reducers: {
    pendingState() {
      return {
        ...initialState,
        loading: true,
      };
    },

    fulfilledState(_, { payload }) {
      return {
        ...initialState,
        message: payload || null,
      };
    },

    rejectedState(_, { payload }) {
      return {
        ...initialState,
        hasError: true,
        message: payload || 'Something went wrong. Please try again.',
      };
    },

    resetState() {
      return { loading: false, hasError: false, message: null };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;