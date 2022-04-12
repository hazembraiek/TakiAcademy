import React from "react";
import { useDispatch } from "react-redux";
import { ToggleAction } from "../../Store/Slices/TogglinData";
import BtnExit from "./../../Assets/Icons/xmark-solid.svg";
import Tiltle from "./Tiltle";
type titleType = {
  title: string;
};
function HeaderModal({ title }: titleType) {
  const dispatch = useDispatch();
  const HidePopup = () => {
    dispatch(ToggleAction.ToggleModal(""));
  };
  return (
    <div className="header__modal">
      <Tiltle text={title} />
      <div className="icon_exit" onClick={HidePopup}>
        <img src={BtnExit} alt="" className="resizeImg" />
      </div>
    </div>
  );
}

export default HeaderModal;
