import { configureStore } from "@reduxjs/toolkit";
import SelectedChildSlice from "./Slices/SelectedChild";
import ChildrenSlice from "./Slices/Children";
import DataSlice from "./Slices/Data";
import ExameSlice from "./Slices/GetExame";
import ToggleSlice from "./Slices/TogglinData";
import SessionSlice from "./Slices/GetSubjects";
import SubjectsSlice from "./Slices/GetSessionsData";
import MessagesSlice from "./Slices/Messages";
import PopupSlice from "./Slices/Popup";

const store = configureStore({
  reducer: {
    Child: SelectedChildSlice.reducer,
    Children: ChildrenSlice.reducer,
    Data: DataSlice.reducer,
    Examens: ExameSlice.reducer,
    Toggle: ToggleSlice.reducer,
    Sessions: SessionSlice.reducer,
    SubjectsProgress: SubjectsSlice.reducer,
    Messages: MessagesSlice.reducer,
    Popup: PopupSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
