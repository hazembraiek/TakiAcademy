import React from "react";
import { Link } from "react-router-dom";
import { HeaderType } from "../../models/ComponentsTypes";
import angleDown from "./../../Assets/Icons/angle-down-solid.svg";
import More from "./More";

function CompsHeader({
  icon,
  whithIcon = false,
  text,
  type,
  isOpen = false,
}: HeaderType) {
  const Path = whithIcon ? "sessions-plan" : type ? type : "";
  const classes =
    !whithIcon && Path !== "" ? "blue-Color border" : "blue-Color";
  return (
    <header className="CompsHeader">
      <div className="CompsHeader__title">
        {whithIcon && (
          <span>
            <img src={icon} alt="icon" className="mediumSizeImg" />
          </span>
        )}
        <p className={`CompsHeader__text ${classes}`}>{text}</p>
      </div>
      {!isOpen && <More Path={Path} />}
    </header>
  );
}

export default CompsHeader;
