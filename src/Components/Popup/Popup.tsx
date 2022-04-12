import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import erreur from "./../../Assets/Icons/xmark-solid.svg";
import success from "./../../Assets/Icons/check-solid.svg";

function Popup({ className }) {
  const msg = useSelector<RootState, string>((state) => state.Popup.msg);
  const status = useSelector<RootState, boolean>((state) => state.Popup.status);
  const classes = `popup ${className}`;
  return (
    <div className={classes}>
      <div
        className="popup__response"
        style={{ backgroundColor: `${!status ? "red" : "green"}` }}
      >
        <p>
          <img
            src={!status ? erreur : success}
            alt=""
            className="mediumSizeImg"
          />
        </p>
      </div>
      <div className="popup__message">
        <p>{msg}</p>
      </div>
    </div>
  );
}

export default Popup;
