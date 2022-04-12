import React from "react";
import { useSelector } from "react-redux";
import { sessionsType } from "../../models/ComponentsTypes";
import { RootState } from "../../Store";
import { FormatTime } from "../../View/WorkTodo/WorkTodo";
import Download from "../Download/Download";
import HeaderModal from "../PageComponents/HeaderModal";

function CalendarModal() {
  const SessonData = useSelector<RootState, sessionsType | null>(
    (state) => state.Toggle.Session
  );
  return (
    <div className="calendar-modal">
      <HeaderModal title="Travail a faire" />
      <p className="calendar-modal-subject">{SessonData?.subject}</p>
      <p className="calendar-modal-title">Travail a faire n 1</p>
      <div className="calendar-modal-prof">
        <p>
          Professor : <span className="prof">{SessonData?.prof}</span>
        </p>
        <p className="niveau">
          Niveaux: <span>Niveaux</span>
        </p>
      </div>
      <p className="duration">
        Heure : <span>{FormatTime(new Date(SessonData?.date!))}</span>
      </p>
      <Download title="Ficher n 1" />
      <Download title="Ficher n 1" />
    </div>
  );
}

export default CalendarModal;
