import React from "react";

type IModalProps = React.PropsWithChildren & {
  isVisible: boolean;
  onClose: () => void;
};

const Modal = ({ isVisible, onClose, children }: IModalProps) => {
  const handleClose = (e: any) => {
    if (e.target.id === "wrapper") onClose();
  };
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[450px] flex flex-col">
        <button
          type="button"
          className="text-xl text-white place-self-end"
          onClick={onClose}
        >
          X
        </button>
        <div className="p-2 bg-white">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
