import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import GetData from "../../Utils/GetData";
import GetAllData from "../../Utils/GetAllData";
import {
  ChapterType,
  ProgressChildType,
  SectionType,
  sessionChildType,
  sessionsType,
  SubjectsProgressType,
  subjectType,
} from "../../models/ComponentsTypes";
import GetSubjectSections from "../../Utils/GetSubjectSections";

type ActionTypeSessions = {
  id: string;
  ChildSessions: sessionChildType[];
  AllSessions: sessionsType[];
};

type ActionSubjectProgressType = {
  Sections: SectionType[];
  id: string;
  SubjectProgressArray: subjectType[];
  ProgressChild: ProgressChildType[];
  Subjects: subjectType[];
};

type Sessions = {
  Sessions: sessionsType[];
  SubjectsProgress: SubjectsProgressType[];
};

const initialState: Sessions = { Sessions: [], SubjectsProgress: [] };
const SessionSlice = createSlice({
  name: "Sessions",
  initialState,
  reducers: {
    getSessions(state, action: PayloadAction<ActionTypeSessions>) {
      const { id, ChildSessions, AllSessions } = action.payload;
      const Sessions = GetAllData(id!, ChildSessions, "idChild");
      const ArraySessions: sessionsType[] = [];
      Sessions.forEach((ele: sessionChildType) => {
        const session = GetData(ele.idSession!, AllSessions);
        ArraySessions.push(session);
      });
      state.Sessions = [...ArraySessions];
    },
    UdpateDataProgress(
      state,
      action: PayloadAction<ActionSubjectProgressType>
    ) {
      const array = GetSubjectSections(
        action.payload.Sections,
        action.payload.Subjects,
        action.payload.id
      );

      const ProgressArray = array?.map((subject: subjectType) => {
        const Check = action.payload.SubjectProgressArray.includes(subject);
        let percentage: number;
        if (Check) {
          const ChapterProgress = subject.Chapters.map(
            (ele: ChapterType) =>
              action.payload.ProgressChild.find(
                (el) =>
                  el.childId === action.payload.id && ele.id === el.ChapterId
              )?.progress
          ).filter((num) => num);
          const SumProgress = ChapterProgress.reduce(
            (init, curr) => init! + curr!,
            0
          );
          percentage = (+SumProgress! * 100) / (+subject.Chapters.length * 100);
          return { id: subject.id, progress: percentage };
        } else {
          return { id: subject.id, progress: 0 };
        }
      });
      state.SubjectsProgress = [...ProgressArray];
    },
  },
});

export const SessionsAction = SessionSlice.actions;
export default SessionSlice;
