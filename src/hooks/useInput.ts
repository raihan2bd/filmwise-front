import { useReducer, ChangeEvent, FocusEvent } from 'react';

interface InputState {
  value: string;
  isTouched: boolean;
  errorMsg: string | null;
}

type InputAction =
  | { type: 'INPUT'; value: string; errorMsg: string | null }
  | { type: 'BLUR' }
  | { type: 'RESET' };

const initialInputState: InputState = {
  value: '',
  isTouched: false,
  errorMsg: null,
};

const inputStateReducer = (state: InputState, action: InputAction): InputState => {
  if (action.type === 'INPUT') {
    return { ...state, value: action.value, errorMsg: action.errorMsg };
  }
  if (action.type === 'BLUR') {
    return { ...state, isTouched: true };
  }
  if (action.type === 'RESET') {
    return { ...initialInputState };
  }
  return state;
};

const useInput = (validateValue: (value: string) => string | null) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = inputState.errorMsg === null;

  const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const errorMsg = validateValue(value);
    dispatch({ type: 'INPUT', value, errorMsg });
  };

  const inputBlurHandler = () => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    errorMsg: inputState.errorMsg,
    isTouched: inputState.isTouched,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
