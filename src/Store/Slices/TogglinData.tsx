import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToggleData } from "../../Constants/ToggleData";
import {
  examensType,
  sessionsType,
  ToggleDataType,
  UpdatePageType,
} from "../../models/ComponentsTypes";

const initialState: ToggleDataType = ToggleData;

const ToggleSlice = createSlice({
  name: "Togglin Data",
  initialState,
  reducers: {
    ToggleSetting(state) {
      state.Setting = !state.Setting;
    },
    ShowDetail(state, action: PayloadAction<examensType>) {
      state.ExameDetails = !state.ExameDetails;
      state.exame = { ...action.payload };
    },
    hide(state) {
      state.ExameDetails = false;
      state.liveDetails = false;
    },
    ToggleModal(state, action: PayloadAction<string>) {
      state.ToggleModal = !state.ToggleModal;
      state.TypeModal = action.payload;
    },
    ToggleChildForm(state) {
      state.ChildExist = !state.ChildExist;
    },
    ToggleLiveDetail(state, action: PayloadAction<string>) {
      state.liveDetails = !state.liveDetails;
      state.idLive = action.payload;
    },
    SetPaggination(state, action: PayloadAction<Number>) {
      state.Paggination = action.payload;
    },
    UpdatePage(state, action: PayloadAction<UpdatePageType>) {
      const { Event, Max } = action.payload;
      if (
        Event === "Incre" &&
        +state.PagginationPage * +state.Paggination < Max
      ) {
        state.PagginationPage = +state.PagginationPage + 1;
      } else if (state.PagginationPage > 1 && Event === "Decre") {
        state.PagginationPage = +state.PagginationPage - 1;
      }
    },
    resetPaggination(state) {
      state.PagginationPage = 1;
      state.Paggination = 5;
    },
    resetPage(state) {
      state.PagginationPage = 1;
    },
    setSubject(state, action: PayloadAction<string>) {
      state.ClickedSubject = action.payload;
    },
    ToggleSubjects(state) {
      state.AllSubject = !state.AllSubject;
    },
    setSession(state, action: PayloadAction<sessionsType>) {
      state.Session = action.payload;
    },
    CheckIdChild(state, action: PayloadAction<boolean>) {
      state.ChildValid = action.payload;
    },
  },
});

export const ToggleAction = ToggleSlice.actions;
export default ToggleSlice;
