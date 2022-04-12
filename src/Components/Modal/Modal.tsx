import React from "react";
import { useDispatch } from "react-redux";
import { ToggleAction } from "../../Store/Slices/TogglinData";

type ModalType = {
  children: React.ReactNode;
};
function Modal({ children }: ModalType) {
  const dispatch = useDispatch();
  const HidePopup = () => {
    dispatch(ToggleAction.ToggleModal(""));
  };
  return (
    <>
      <div className="modal">
        <div className="Hide" onClick={HidePopup}></div>
        <div className="modal__content">{children}</div>
      </div>
    </>
  );
}
export default Modal;
