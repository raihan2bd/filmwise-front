import { ReactNode, MouseEvent } from 'react';

type PropsType = {
  btnClass?: string,
  type?: "button" | "submit" | "reset",
  onClickHandler?: (event: MouseEvent<HTMLButtonElement>) => void,
  children: ReactNode,
};

;

const Button = ({ btnClass, type = "button", onClickHandler, children }: PropsType) => {
  const btnClasses = btnClass ? `text-sm text-white bg-lime-500 hover:bg-lime-700 active:bg-lime-500 px-4 py-2 rounded-sm disabled:opacity-25 disabled:cursor-not-allowed ${btnClass}` : `text-sm text-white bg-lime-500 hover:bg-lime-700 active:bg-lime-500 px-4 py-2 rounded-sm disabled:opacity-25 disabled:cursor-not-allowed`;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClickHandler) {
      onClickHandler(event);
    }
  };

  return (
    <button className={btnClasses} type={type? type : 'button'} onClick={onClickHandler ? handleClick : undefined}>
      {children}
    </button>
  );
};

export default Button;
