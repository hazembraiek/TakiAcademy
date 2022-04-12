import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ProgressChildType,
  SubjectsDataType,
  subjectType,
} from "../../models/ComponentsTypes";
import GetSubjectFromChapter from "../../Utils/GetSubjectFromChapter";
import GetAllData from "./../../Utils/GetAllData";

type ActionSubjectsType = {
  id: string;
  Progress: ProgressChildType[];
  Subjects: subjectType[];
};

const initialState: SubjectsDataType = { SubjectProg: [] };

const SubjectsSlice = createSlice({
  name: "Subjects",
  initialState,
  reducers: {
    getSubjectsProg(state, action: PayloadAction<ActionSubjectsType>) {
      const { id, Progress, Subjects } = action.payload;
      const ProgressChild = GetAllData(id!, Progress, "childId");

      let ArraySubjects: subjectType[] = [];
      ProgressChild.forEach((ele) => {
        let subject = GetSubjectFromChapter(ele.ChapterId, Subjects)!;
        ArraySubjects.push(subject!);
      });
      ArraySubjects = ArraySubjects.filter((value, index, self) => {
        return self.findIndex((v) => v.id === value.id) === index;
      });
      state.SubjectProg = [...ArraySubjects];
    },
  },
});

export const SubjectsAction = SubjectsSlice.actions;
export default SubjectsSlice;
