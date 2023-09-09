import { ReactNode } from "react";
import ReactDOM from "react-dom";

type PropsType = {
  backDropCls?: string;
  cardCls?: string;
  onHandleClick?: () => void;
  children: ReactNode;
};

const Modal = ({
  backDropCls = "fixed h-[100vh] z-50 w-[100%] bg-black/80 backdrop-blur flex flex-col justify-center items-center overflow-y-scroll",
  cardCls = "bg-white/20 p-2 rounded-lg w-[766px] max-w-[100%]",
  onHandleClick,
  children,
}: PropsType) => {
  const portalContainer = document.getElementById("overlays");
  return (
    <>
      {portalContainer &&
        ReactDOM.createPortal(
          <div className={backDropCls}>
            <div className={cardCls}>
              <button
                type="button"
                className="rounded text-white px-2 bg-red-500 hover:bg-red-800 active:bg-red-400 w-fit block ms-auto"
                onClick={onHandleClick ? onHandleClick : () => {}}
              >
                X
              </button>
              {children}
            </div>
          </div>,
          portalContainer
        )}
    </>
  );
};

export default Modal;
