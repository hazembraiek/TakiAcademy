import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Tiltle from "../../Components/PageComponents/Tiltle";
import {
  ChapterType,
  ProgressChildType,
  SectionType,
  SubjectsProgressType,
  subjectType,
} from "../../models/ComponentsTypes";
import { RootState } from "../../Store";
import Card from "../../UI/Card";
import CalcProgress from "../../Utils/CalcProgress";
import { ToggleAction } from "../../Store/Slices/TogglinData";
import GetSubjectSections from "../../Utils/GetSubjectSections";
import Getprogress from "../../Utils/GetProgress";

const getNbVideos = (Array: ChapterType[]) => {
  let initialValue: number = 0;

  const SumVideos = Array.reduce(
    (previousValue, currentValue) => +previousValue + +currentValue.nbVideos,
    initialValue
  );
  return SumVideos;
};

const Subject = ({ subject, progress }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="others__subject"
      onClick={() =>
        setTimeout(() => {
          dispatch(ToggleAction.setSubject(subject.id));
        }, 0)
      }
    >
      <div className="others-subject-info">
        <div className="subject-icon--name">
          <img src={subject.icon} alt="" className="mediumSizeImg" />
          <p className="name">{subject.title}</p>
        </div>
        <div className="subject-progressBar">
          <div style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <div className="subject-progress-nb">
        <p>{progress}%</p>
      </div>
    </div>
  );
};

const Chapter = ({ progress, title, prof, videos, index }) => {
  return (
    <div className="chapter">
      <p className="number">{index < 10 ? `0${index}` : index}</p>
      <div className="details">
        <p className="title">{title}</p>
        <div className="info">
          <p className="prof">{prof}</p>
          <p className="videos">{videos} videos</p>
        </div>
        <div className="progress-container">
          <div className="progress-bar">
            <div style={{ width: `${progress ? progress : "0"}%` }}></div>
          </div>
          <p className="progress-percentage">{progress ? progress : "0"}%</p>
        </div>
      </div>
    </div>
  );
};

function Chapters() {
  const { id } = useParams();
  const setSubject = useSelector<RootState, boolean>(
    (state) => state.Toggle.AllSubject
  );
  const dispatch = useDispatch();
  const Progress = useSelector<RootState, ProgressChildType[]>(
    (state) => state.Data.progressChild
  );
  let ClickedSubject = useSelector<RootState, string>(
    (state) => state.Toggle.ClickedSubject
  );

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

  const SubjectSection = GetSubjectSections(Sections, Subjects, id);

  let SubjectClick = SubjectSection?.find(
    (subject: subjectType) => subject.id === ClickedSubject
  );
  if (!SubjectClick) {
    SubjectClick = ArraySubjectsChild[0];
    ClickedSubject = ArraySubjectsChild[0].id;
  }

  const Chapters = SubjectClick?.Chapters;
  const progressCurrentSubject = Getprogress(progressSubjects, ClickedSubject);
  const NbSubjects = setSubject ? SubjectSection.length : 5;
  return (
    <div className="chapters">
      <Tiltle text="Matiéres" />
      <div className="chapters__Gallery">
        <Card className="chapters__subjects">
          <div className="subject">
            <img src={SubjectClick.icon} alt="" className="mediumSizeImg" />
            <p className="name">{SubjectClick.title}</p>
          </div>
          <div className="subject__data">
            <div className="subject__progress">
              <div className="progress-sub">
                <p>Progression</p>
                <p className="prog">{progressCurrentSubject}%</p>
              </div>
              <div className="progress-bar">
                <div style={{ width: `${progressCurrentSubject}%` }}></div>
              </div>
            </div>
            <div className="subject__nb">
              <p className="nb-chapters">
                Nombre de chapitres : <span> {Chapters.length} chapitre</span>
              </p>
              <p className="nb-videos">
                Nombre de Videos: <span>{getNbVideos(Chapters)} videos</span>
              </p>
            </div>
            <div className="others">
              <p className="others__title">Autre matiéres</p>
              {SubjectSection?.slice(0, NbSubjects)?.map(
                (subject: subjectType) => {
                  const progress = Getprogress(progressSubjects, subject.id);
                  return (
                    <Subject
                      progress={progress}
                      subject={subject}
                      key={subject.id}
                    />
                  );
                }
              )}
            </div>
          </div>
          <p
            className="more"
            onClick={() => dispatch(ToggleAction.ToggleSubjects())}
          >
            Voir {setSubject && NbSubjects > 5 ? "moins" : "plus"}
          </p>
        </Card>
        <Card className="chapters__content">
          <div className="chapters--header">
            <ul>
              <li>Cours</li>
              <li>Examens</li>
              <li>Enregistrements</li>
              <li>Divers</li>
            </ul>
          </div>
          <div className="chapters-container">
            {Chapters?.map((chap: ChapterType, i: number) => {
              const { progress } = CalcProgress(Progress, chap, id);
              return (
                <Chapter
                  key={chap.id}
                  progress={progress}
                  title={chap.title}
                  prof={chap.prof}
                  videos={chap.nbVideos}
                  index={i + 1}
                />
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Chapters;
