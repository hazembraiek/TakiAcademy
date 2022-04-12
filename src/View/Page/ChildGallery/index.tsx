import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { RootState } from "../../../Store";
import { ChildAction } from "../../../Store/Slices/SelectedChild";
import Chapters from "../../Chapters/Chapters";
import ExamensChild from "../../Examens/ExamensChild";
import Home from "../../Home/Home";
import LiveSessions from "../../LiveSessions/LiveSessions";
import MoneyTransfer from "../../MoneyTransfer/MoneyTransfer";
import Sessions from "../../Sessions/Sessions";
import WorkTodo from "../../WorkTodo/WorkTodo";

type PageType = {
  IdChildSelect: string;
};

function ChildGallery({ IdChildSelect }: PageType) {
  const dispatch = useDispatch();
  let { pathname } = useLocation();
  const idChild = pathname.split("/")[2];
  pathname = pathname.split("/")[1];
  const IdValid = useSelector<RootState, boolean>(
    (state) => state.Toggle.ChildValid
  );
  useEffect(() => {
    if (idChild && IdValid) dispatch(ChildAction.setChildSelected(idChild));
  }, [idChild, dispatch, pathname, IdValid]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Navigate to="/home" />} />
      <Route
        path={`/${pathname}`}
        element={<Navigate to={`/${pathname}/${IdChildSelect}`} />}
      />
      <Route path="/home/:id" element={<Home />} />
      <Route path="/live-videos/:id" element={<LiveSessions />} />
      <Route path="/sessions-plan/:id" element={<WorkTodo />} />
      <Route path="/examens/:id" element={<ExamensChild />} />
      <Route path="/porte-monnaie/:id" element={<MoneyTransfer />} />
      <Route path="/subjects/:id" element={<Sessions />} />
      <Route path="/chapters/:id" element={<Chapters />} />
    </Routes>
  );
}

export default ChildGallery;
