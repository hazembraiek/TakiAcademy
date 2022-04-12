import React from "react";
import { examensType } from "../../models/ComponentsTypes";
import Button from "../../UI/Button";
import HeaderExame from "./HeaderExame";
import download from "./../../Assets/Icons/cloud-arrow-down-solid.svg";
import Download from "../Download/Download";

type PropsType = {
  exame: examensType;
};

function ExamenDetail({ subject, title, prof, date }: examensType) {
  return (
    <div className="detail">
      <HeaderExame title={title} subject={subject} prof={prof} date={date} />
      <div className="downloads">
        <p className="examen__title">Examen</p>
        <Download title="Fichier n 1" />
        <Download title="Fichier n 2" />
      </div>
    </div>
  );
}

export default ExamenDetail;
