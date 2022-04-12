import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Messages from "../../Constants/Messages";
import { messageType } from "../../models/ComponentsTypes";

type initialStateType = {
  Messages: messageType[];
  ShowChat: boolean;
};

const initialState: initialStateType = { Messages, ShowChat: false };

const MessagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessage(state, action: PayloadAction<messageType>) {
      const { msg, date, sender } = action.payload;
      state.Messages.push({ msg, sender, date });
    },
    ToggleChat(state) {
      state.ShowChat = !state.ShowChat;
    },
  },
});

export const MessageAction = MessagesSlice.actions;
export default MessagesSlice;
