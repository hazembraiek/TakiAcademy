import React from "react";
import { Link } from "react-router-dom";
import angleDown from "./../../Assets/Icons/angle-down-solid.svg";

type PathType = {
  Path: string;
};
function More({ Path }: PathType) {
  const PathExist = Path === "" ? false : true;
  const content = (
    <div className="more">
      <p>{PathExist ? "Voir plus" : "Tous"}</p>
      <img src={angleDown} alt="angle" className="smallSizeImg" />
    </div>
  );
  return <>{PathExist ? <Link to={`/${Path}`}>{content}</Link> : content}</>;
}

export default More;
