import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Examens from "../../Constants/Examens";
import { dataType } from "../../models/ComponentsTypes";
import Sessions from "../../Constants/Sessions";
import SessionChild from "../../Constants/SessionChild";
import ChapterProgress from "../../Constants/ChapterProgress";
import Subjects from "../../Constants/Subjects";
import Sections from "../../Constants/Sections";
import HistoryPoints from "../../Constants/HistoryPoints";
import Parents from "../../Constants/ParentsData";
import moment from "moment";
import { stat } from "fs/promises";

const getCurrentWeek = () => {
  let startOfWeek = moment().startOf("isoWeek");
  let endOfWeek = moment().endOf("isoWeek");

  let days: Date[] = [];
  let day = startOfWeek;

  while (day <= endOfWeek) {
    days.push(day.toDate());
    day = day.clone().add(1, "d");
  }
  return days;
};

const initialState: dataType = {
  examens: Examens,
  sessions: Sessions,
  sessionChild: SessionChild,
  progressChild: ChapterProgress,
  subjects: Subjects,
  sections: Sections,
  HistoryPoints: HistoryPoints,
  Parents,
  ParentId: localStorage.getItem("Token")?.split("-")[1] || "",
  DateLogin: localStorage.getItem("Token")?.split("-")[3] || "",
  Week: getCurrentWeek(),
};
const DataSlice = createSlice({
  name: "Data",
  initialState,
  reducers: {
    setParents(state, action: PayloadAction<string>) {
      state.ParentId = action.payload;
    },
    setDate(state, action: PayloadAction<number>) {
      state.DateLogin = action.payload.toString();
    },
    setWeek(state, action: PayloadAction<Date[]>) {
      state.Week = action.payload;
    },
    AddChild(state, action: PayloadAction<{ id: string; section: string }>) {
      state.sections
        .find((section) => section.title === action.payload.section)
        ?.children.push(action.payload.id);
    },
    resetWeek(state) {
      state.Week = getCurrentWeek();
    },
  },
});

export const DataAction = DataSlice.actions;
export default DataSlice;
