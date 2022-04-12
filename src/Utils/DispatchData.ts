import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ChildDataType,
  examensType,
  ProgressChildType,
  SectionType,
  sessionChildType,
  sessionsType,
  subjectType,
} from "../models/ComponentsTypes";
import { RootState } from "../Store";
import { ExamenAction } from "../Store/Slices/GetExame";
import { SessionsAction } from "../Store/Slices/GetSubjects";
import { ToggleAction } from "../Store/Slices/TogglinData";

function DispatchData(id: string, pathname: string) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Children = useSelector<RootState, ChildDataType[]>(
    (state) => state.Children.ChildData
  );

  const SubjectProgressArray = useSelector<RootState, subjectType[]>(
    (state) => state.SubjectsProgress.SubjectProg
  );
  const Examens = useSelector<RootState, examensType[]>(
    (state) => state.Data.examens
  );
  const ChildSessions = useSelector<RootState, sessionChildType[]>(
    (state) => state.Data.sessionChild
  );
  const AllSessions = useSelector<RootState, sessionsType[]>(
    (state) => state.Data.sessions
  );
  const Progress = useSelector<RootState, ProgressChildType[]>(
    (state) => state.Data.progressChild
  );
  const Subjects = useSelector<RootState, subjectType[]>(
    (state) => state.Data.subjects
  );
  const Sections = useSelector<RootState, SectionType[]>(
    (state) => state.Data.sections
  );
  const Child = Children.find((child) => child.id === pathname.split("/")[2]);
  if (!Child && pathname.split("/")[2]) {
    dispatch(ToggleAction.CheckIdChild(false));
  } else {
    dispatch(ToggleAction.CheckIdChild(true));
  }
  useEffect(() => {
    dispatch(
      ExamenAction.getExamens({ children: Children, examens: Examens, id: id! })
    );
    dispatch(SessionsAction.getSessions({ id, ChildSessions, AllSessions }));
    dispatch(ToggleAction.hide());
    dispatch(ToggleAction.resetPaggination());
    dispatch(
      SessionsAction.UdpateDataProgress({
        id,
        Sections,
        SubjectProgressArray,
        ProgressChild: Progress,
        Subjects,
      })
    );
  }, [
    dispatch,
    Children,
    Examens,
    ChildSessions,
    AllSessions,
    SubjectProgressArray,
    id,
    pathname,
    Progress,
    Subjects,
    Sections,
    navigate,
    Child,
  ]);
}

export default DispatchData;
