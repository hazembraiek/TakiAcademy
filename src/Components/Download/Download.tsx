import React from "react";
import Button from "../../UI/Button";
import download from "./../../Assets/Icons/cloud-arrow-down-solid.svg";
type DownloadType = {
  title: string;
};
function Download({ title }: DownloadType) {
  return (
    <div className="download">
      <p>{title}</p>
      <Button>
        <img src={download} alt="" className="mediumSizeImg" /> Télecharger
      </Button>
    </div>
  );
}

export default Download;
