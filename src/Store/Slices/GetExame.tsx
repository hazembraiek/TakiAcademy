import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChildDataType, examensType } from "../../models/ComponentsTypes";
import GetData from "../../Utils/GetData";

type Examen = {
  Examens: examensType[];
};

type ActionType = {
  children: ChildDataType[];
  examens: examensType[];
  id: string;
};

const initialState: Examen = { Examens: [] };

const ExameSlice = createSlice({
  name: "examens",
  initialState,
  reducers: {
    getExamens(state, action: PayloadAction<ActionType>) {
      const data = action.payload;

      const ChildExamens = GetData(data.id, data.children)?.examens;
      let ArrayExame: examensType[] = [];
      ChildExamens.forEach((ele: examensType) => {
        const exam = GetData(ele.idExame!, data.examens);
        ArrayExame.push({ ...exam, note: ele.note });
      });
      state.Examens = [...ArrayExame];
    },
  },
});

export const ExamenAction = ExameSlice.actions;
export default ExameSlice;
