import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  msg: string;
  status: boolean;
};

const initialState: initialStateType = { msg: "", status: true };

const PopupSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setPopup(state, action: PayloadAction<{ msg: string; status: boolean }>) {
      state.msg = action.payload.msg;
      state.status = action.payload.status;
    },
  },
});

export const PopupAction = PopupSlice.actions;
export default PopupSlice;
