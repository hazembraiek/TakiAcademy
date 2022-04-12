import React from "react";
import { Link } from "react-router-dom";
import { LiveSessionType } from "../../models/ComponentsTypes";
import clock from "./../../Assets/Icons/clock-regular.svg";

function LiveSession({ date, prof, subject }: LiveSessionType) {
  date = new Date(date);
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Link to="/sessions-plan">
      <div className="live-sess">
        <div className="session-title">
          <img src={clock} alt="clock" className="mediumSizeImg" />
          <p className="session-date">Aujourd'hui - {time}</p>
        </div>
        <div className="session-description">
          <p className="subject">Matiere: {subject}</p>
          <p className="prop">Pressenter Par {prof}</p>
        </div>
      </div>
    </Link>
  );
}

export default LiveSession;
