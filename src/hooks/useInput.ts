import { useReducer, ChangeEvent } from 'react';

interface InputState {
  value: string;
  isTouched: boolean;
}

type InputAction =
  | { type: 'INPUT'; value: string; }
  | { type: 'BLUR' }
  | { type: 'RESET' };

const initialInputState: InputState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state: InputState, action: InputAction): InputState => {
  if (action.type === 'INPUT') {
    return { ...state, value: action.value };
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

  const errorMsg = validateValue(inputState.value);

  const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch({ type: 'INPUT', value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    errorMsg,
    isTouched: inputState.isTouched,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
