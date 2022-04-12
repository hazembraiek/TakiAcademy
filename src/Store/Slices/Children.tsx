import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ChildData from "../../Constants/ChildrenData";
import { ChildDataType, ParentType } from "../../models/ComponentsTypes";

type ActionType = {
  idParent: string;
  Parents: ParentType[];
};

type initialStateType = {
  ChildData: ChildDataType[];
  ChiledAdded: ChildDataType | null;
};

const initialState: initialStateType = { ChildData, ChiledAdded: null };

const ChildrenSlice = createSlice({
  name: "Children",
  initialState,
  reducers: {
    GetChildren(state, action: PayloadAction<ActionType>) {
      const { idParent, Parents } = action.payload;

      const AllChildren = state.ChildData;
      if (!idParent) {
        return;
      }
      const parent = Parents.find(
        (parent: ParentType) => parent.id === idParent
      );
      const Children = parent?.children.map(
        (child) => AllChildren.find((el) => el.id === child)!
      );

      state.ChildData = [...Children!];
    },
    AddChild(state, action: PayloadAction<ChildDataType>) {
      const {
        id,
        identifier,
        FirstName,
        LastName,
        email,
        Phone,
        password,
        section,
      } = action.payload;
      const newChild = {
        id,
        identifier,
        FirstName,
        LastName,
        email,
        password,
        Phone,
      };
      state.ChildData = [...state.ChildData, newChild];
      state.ChiledAdded = { ...newChild, section };
    },
    resetChild(state) {
      state.ChiledAdded = null;
    },
  },
});

export const ChildrenAction = ChildrenSlice.actions;
export default ChildrenSlice;
