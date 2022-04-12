import CompsHeader from "../../Components/PageComponents/CompsHeader";
import LiveSession from "../../Components/PageComponents/LiveSession";
import More from "../../Components/PageComponents/More";
import SubjectProgress from "../../Components/PageComponents/SubjectProgress";
import Table from "../../Components/PageComponents/Table";
import Tiltle from "../../Components/PageComponents/Tiltle";
import Card from "../../UI/Card";
import { AllSesionsCol } from "../../Utils/ColumnsTable";
import Live from "./../../Assets/Icons/cast.7fddef1e.svg";
import { ExamensCol } from "../../Utils/ColumnsTable";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import download from "./../../Assets/Icons/cloud-arrow-down-solid.svg";

import {
  ChildDataType,
  examensType,
  SectionType,
  sessionsType,
  SubjectsProgressType,
  subjectType,
} from "../../models/ComponentsTypes";
import GetSubjectSections from "../../Utils/GetSubjectSections";
import { useParams } from "react-router-dom";
import Download from "../../Components/Download/Download";
import Button from "../../UI/Button";

function Home() {
  const { id } = useParams();
  const ArrayExame = useSelector<RootState, examensType[]>(
    (state) => state.Examens.Examens
  );
  let ArraySessions: sessionsType[] = useSelector<RootState, sessionsType[]>(
    (state) => state.Sessions.Sessions
  );

  const TodaySession = ArraySessions.filter((sess) => {
    return (
      new Date(sess.date).toLocaleDateString() ===
      new Date(Date.now()).toLocaleDateString()
    );
  });

  const Sections = useSelector<RootState, SectionType[]>(
    (state) => state.Data.sections
  );
  const Subjects = useSelector<RootState, subjectType[]>(
    (state) => state.Data.subjects
  );

  const progressSubjects = useSelector<RootState, SubjectsProgressType[]>(
    (state) => state.Sessions.SubjectsProgress
  );

  const ChildAddedInfo = useSelector<RootState, ChildDataType | null>(
    (state) => state.Children.ChiledAdded
  );

  const ArraySubjectsChild = GetSubjectSections(Sections, Subjects, id);

  return (
    <div className="home">
      {!ChildAddedInfo ? (
        <>
          <div className="home__first-section">
            <Card className="home__live-session">
              <CompsHeader
                icon={Live}
                text="Séances en direct d'aujurd'hui"
                whithIcon={true}
              />
              <div className="liveSession">
                {TodaySession.map((sess) => {
                  return (
                    <LiveSession
                      key={sess.id}
                      date={sess.date}
                      prof={sess.prof}
                      subject={sess.subject}
                    />
                  );
                })}
              </div>
            </Card>
            <Card className="home__all-session">
              <CompsHeader
                text="Séances en direct Staistiques"
                type="live-videos"
              />
              <Table columns={AllSesionsCol} ArrayData={ArraySessions} />
            </Card>
          </div>
          <div className="home__second-section">
            <Card className="subjects">
              <Tiltle text="Progression" />
              <div className="subjects__progress">
                {ArraySubjectsChild?.slice(0, 3).map((subject: subjectType) => {
                  const percentage = progressSubjects.find(
                    (el) => el.id === subject.id
                  )?.progress;
                  return (
                    <SubjectProgress
                      key={subject.id}
                      progress={Math.trunc(percentage!)}
                      subject={subject.title}
                      icon={subject.icon}
                      id={subject.id}
                    />
                  );
                })}
              </div>
              <More Path="subjects" />
            </Card>
            <Card className="examens_tab">
              <CompsHeader text="Examens" type="examens" />
              <Table
                columns={ExamensCol}
                id="bordorBottom"
                ArrayData={ArrayExame}
              />
            </Card>
          </div>
        </>
      ) : (
        <Card className="Child-add">
          <Tiltle text="Ajouter l'acte état civil de votre enfant" />
          <p>
            Nom: <span>{ChildAddedInfo?.FirstName}</span>
          </p>
          <p>
            ID: <span>{ChildAddedInfo.identifier}</span>
          </p>
          <p>
            Email: <span>{ChildAddedInfo.email}</span>
          </p>
          <div className="classes">
            <p>
              Classe: <span>Bac {ChildAddedInfo.section}</span>
            </p>
            <p>Matiére a option: italien</p>
          </div>
          <div className="Child-add-download">
            <p>Piéce jointes</p>
            <Download title="Fichier n 1" />
            <Download title="Fichier n 2" />
            <Button>
              <img src={download} alt="" className="mediumSizeImg" /> Uploader
            </Button>
          </div>
          <div className="status">
            Status: <span>En train de vérifier les documents</span>
          </div>
        </Card>
      )}
    </div>
  );
}

export default Home;
