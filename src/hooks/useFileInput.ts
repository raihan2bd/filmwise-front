import { ChangeEvent, useReducer } from 'react';

interface FileInputState {
  value: File | null;
  isTouched: boolean;
}

type FileInputAction =
  | { type: 'INPUT'; value: File | null }
  | { type: 'BLUR' }
  | { type: 'RESET' };

const initialFileInputState: FileInputState = {
  value: null,
  isTouched: false,
}

const fileInputStateReducer = (state: FileInputState, action: FileInputAction): FileInputState => {
  if (action.type === 'INPUT') {
    return { ...state, value: action.value };
  }
  if (action.type === 'BLUR') {
    return { ...state, isTouched: true };
  }
  if (action.type === 'RESET') {
    return { ...initialFileInputState };
  }
  return state;
}

const useFileInput = (validateValue: (value: File | null) => string | null) => {
  const [fileInputState, dispatch] = useReducer(
    fileInputStateReducer,
    initialFileInputState
  );

  const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.files ? event.target.files[0] : null;
    dispatch({ type: 'INPUT', value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  // Validate the value and get the error message
  const errorMsg = validateValue(fileInputState.value);

  return {
    value: fileInputState.value,
    errorMsg,
    isTouched: fileInputState.isTouched,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
}

export default useFileInput;
