import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ChildSelectId from "../../Constants/ChildSelect";
type initialStateType = {
  id: string;
};
const initialState: initialStateType = ChildSelectId;
const SelectedChildSlice = createSlice({
  name: "child Select",
  initialState,
  reducers: {
    setChildSelected(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
  },
});

export const ChildAction = SelectedChildSlice.actions;
export default SelectedChildSlice;
