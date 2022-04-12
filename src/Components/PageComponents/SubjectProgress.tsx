import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ProgressType } from "../../models/ComponentsTypes";
import { ToggleAction } from "../../Store/Slices/TogglinData";

function SubjectProgress({ subject, progress, icon, id }: ProgressType) {
  const dispatch = useDispatch();
  return (
    <Link to={"/chapters"}>
      <div
        className="progress"
        onClick={() => dispatch(ToggleAction.setSubject(id))}
      >
        <div className="progress__subject-info">
          <div className="subject-iconTitle">
            <div className="icon">
              <img src={icon} alt="icon" className="resizeImg" />
            </div>
            <p className="progress__title">{subject}</p>
          </div>
          <p className="progress__percentage">{progress}%</p>
        </div>
        <div className="progress__bar">
          <div style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </Link>
  );
}

export default SubjectProgress;
