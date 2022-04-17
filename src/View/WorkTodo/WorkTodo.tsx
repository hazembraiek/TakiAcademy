import React from "react";
import CompsHeader from "../../Components/PageComponents/CompsHeader";
import Card from "../../UI/Card";
import Angle from "./../../Assets/Icons/angle-down-solid.svg";
import Check from "./../../Assets/Icons/check-solid.svg";
import calendare from "./../../Assets/Icons/calendar-day-solid.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { DataAction } from "../../Store/Slices/Data";
import Time from "../../Constants/TimeData";
import { sessionsType } from "../../models/ComponentsTypes";
import { ToggleAction } from "../../Store/Slices/TogglinData";

export function FormatTime(Date: Date) {
  return `${Date.getHours()?.toString().padStart(2, "0")}:${Date.getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

const Session = ({ prof, date, duration, id, subject, zIndex, Width }) => {
  const TimeStart = FormatTime(new Date(date));
  const DateEnd = new Date(
    new Date(date).getTime() + duration.split(":")[0] * 60000
  );
  const dispatch = useDispatch();
  const TimeEnd = FormatTime(DateEnd);
  const PercentageMinutes = (new Date(date).getMinutes() / 60) * 100;
  const StatusSession =
    new Date(Date.now()) < new Date(date)
      ? "B"
      : new Date(Date.now()) > DateEnd
      ? "D"
      : "L";
  return (
    <div
      className="session"
      onClick={() => {
        dispatch(ToggleAction.ToggleModal("Calendar"));
        dispatch(
          ToggleAction.setSession({
            id,
            title: subject,
            prof,
            time: duration,
            subject,
            date,
          })
        );
      }}
      style={{
        zIndex: `${zIndex}`,
        width: `${Width}%`,
        left: `calc(100% - ${Width}%)`,
        top: `${PercentageMinutes}%`,
      }}
      id={
        StatusSession === "L"
          ? "border-Live"
          : StatusSession === "B"
          ? "border-Soon"
          : ""
      }
    >
      <p className="session__name">{subject}</p>
      <div className="session__time-status">
        <p className="time">
          {TimeStart} - {TimeEnd}
        </p>
        <p
          className="status"
          id={
            StatusSession === "L" ? "Live" : StatusSession === "B" ? "Soon" : ""
          }
        >
          {StatusSession === "L"
            ? "En Direct"
            : StatusSession === "B"
            ? "Bientôt"
            : "Terminé"}
        </p>
      </div>
    </div>
  );
};

const GetWeek = (startDay: Date, EndDay: Date) => {
  let days: Date[] = [];
  for (var d = startDay; d <= EndDay; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }
  return days;
};

const CheckDay = (day1: Date) =>
  day1.toDateString() === new Date().toDateString() ? true : false;

function WorkTodo() {
  const dispatch = useDispatch();
  const days = useSelector<RootState, Date[]>((state) => state.Data.Week);
  const firstDayOfWeek = days[0].getDate().toString().padStart(2, "0");
  const lastDayOfWeek = days[6].getDate().toString().padStart(2, "0");
  const Year = days[6].getFullYear();
  const monthOfFirstDay = days[0].toLocaleDateString("fr-FR", {
    month: "long",
  });
  const monthOfLastDay = days[6].toLocaleDateString("fr-FR", {
    month: "long",
  });
  const GetPrevWeek = () => {
    const endWeek = new Date(days[0].getTime() - 24 * 60 * 60 * 1000);
    const startWeek = new Date(days[0].getTime() - 24 * 60 * 60 * 1000 * 7);
    dispatch(DataAction.setWeek(GetWeek(startWeek, endWeek)));
  };
  const GetNextWeek = () => {
    const endWeek = new Date(days[6].getTime() + 24 * 60 * 60 * 1000);
    const startWeek = new Date(days[6].getTime() + 24 * 60 * 60 * 1000 * 7);
    dispatch(DataAction.setWeek(GetWeek(endWeek, startWeek)));
  };
  let ArraySessions: sessionsType[] = useSelector<RootState, sessionsType[]>(
    (state) => state.Sessions.Sessions
  );

  return (
    <Card className="calendar">
      <CompsHeader text="Travail a faire" />
      <div className="calendar__content">
        <div className="calendar__week">
          <div className="date">
            <div className="prev slider" onClick={GetPrevWeek}>
              <img src={Angle} alt="" className="smallSizeImg" />
              <p>Précédent</p>
            </div>
            <div className="date_conetnt">
              {firstDayOfWeek} {monthOfFirstDay} - {lastDayOfWeek}{" "}
              {monthOfLastDay} {Year}
            </div>
            <div className="next slider" onClick={GetNextWeek}>
              <p>Suivant</p>
              <img src={Angle} alt="" className="smallSizeImg" />
            </div>
          </div>
          <div
            className="current__week"
            onClick={() => dispatch(DataAction.resetWeek())}
          >
            <img src={calendare} alt="" className="smallSizeImg" />
            <p>Cette semaine </p>
            <img src={Check} alt="" className="smallSizeImg" />
          </div>
        </div>
        <div className="calendar__table">
          <table>
            <thead>
              <tr>
                <th></th>
                {days.map((day, i) => {
                  return (
                    <th
                      className={`head ${CheckDay(day) ? "active" : ""}`}
                      key={i}
                    >
                      {day.toLocaleDateString("FR-fr", { weekday: "long" })}
                      <p>
                        {day.toLocaleDateString("FR-fr", {
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </th>
                  );
                })}
              </tr>
              <tr>
                <th></th>
                {days.map((day, i) => (
                  <th id={CheckDay(day) ? "today" : ""} key={i}></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Time.map((el, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <p>{el.time}</p>
                    </td>
                    {days.map((day, i) => {
                      const Sessions = ArraySessions.filter(
                        (session) =>
                          new Date(session.date).toDateString() ===
                            day.toDateString() &&
                          new Date(session?.date).getHours() ===
                            +el.time.split(":")[0]
                      );
                      let InitIndex = 50;
                      let IntialWidth = 110;
                      return (
                        <td id={CheckDay(day) ? "today" : ""} key={i}>
                          {Sessions.map((session) => {
                            InitIndex++;
                            IntialWidth -= 10;
                            return (
                              <Session
                                key={session.id}
                                prof={session.prof}
                                date={session.date}
                                duration={session.time}
                                subject={session.subject}
                                id={session.id}
                                zIndex={InitIndex}
                                Width={IntialWidth}
                              />
                            );
                          })}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}

export default WorkTodo;
