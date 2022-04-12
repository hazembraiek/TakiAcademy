import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Tiltle from "../../Components/PageComponents/Tiltle";
import {
  SectionType,
  SubjectsProgressType,
  subjectType,
} from "../../models/ComponentsTypes";
import { RootState } from "../../Store";
import { ToggleAction } from "../../Store/Slices/TogglinData";
import Card from "../../UI/Card";
import GetSubjectSections from "../../Utils/GetSubjectSections";

function Sessions() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const Sections = useSelector<RootState, SectionType[]>(
    (state) => state.Data.sections
  );
  const Subjects = useSelector<RootState, subjectType[]>(
    (state) => state.Data.subjects
  );

  const progressSubjects = useSelector<RootState, SubjectsProgressType[]>(
    (state) => state.Sessions.SubjectsProgress
  );

  const ArraySubjectsChild = GetSubjectSections(Sections, Subjects, id);

  return (
    <div className="subjects">
      <Tiltle text="Matiéres" />
      <div className="subjects__content">
        {ArraySubjectsChild?.map((subject: subjectType) => {
          const percentage = progressSubjects.find(
            (el) => el.id === subject.id
          )?.progress;
          return (
            <Link to={`/chapters`} key={subject.id}>
              <Card
                className="subject"
                onClick={() => dispatch(ToggleAction.setSubject(subject.id))}
              >
                <div className="subject-icon">
                  <img src={subject.icon} alt="" className="mediumSizeImg" />
                </div>
                <div className="subject-info">
                  <div className="subject-name--avr">
                    <p className="name">{subject.title}</p>
                    <p className="progress-number">
                      {Math.trunc(percentage!)}%
                    </p>
                  </div>
                  <div className="subject-progress">
                    <div style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Sessions;
