import { ReactNode, MouseEvent } from 'react';

type PropsType = {
  btnClass?: string,
  type?: "button" | "submit" | "reset",
  onClickHandler?: (event: MouseEvent<HTMLButtonElement>) => void,
  children: ReactNode,
};

const Button = ({ btnClass, type = "button", onClickHandler, children }: PropsType) => {
  const btnClasses = btnClass ? `btn-default ${btnClass}` : `btn-default`;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClickHandler) {
      onClickHandler(event);
    }
  };

  return (
    <button className={btnClasses} type={type} onClick={onClickHandler ? handleClick : undefined}>
      {children}
    </button>
  );
};

export default Button;
