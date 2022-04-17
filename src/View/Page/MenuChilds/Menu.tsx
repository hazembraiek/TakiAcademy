import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import Tiltle from "../../../Components/PageComponents/Tiltle";
import {
  ChildDataType,
  ParentType,
  ProgressChildType,
  subjectType,
} from "../../../models/ComponentsTypes";
import { RootState } from "../../../Store";
import { ChildrenAction } from "../../../Store/Slices/Children";
import { SubjectsAction } from "../../../Store/Slices/GetSessionsData";
import { ToggleAction } from "../../../Store/Slices/TogglinData";
import Card from "../../../UI/Card";
import user from "./../../../Assets/Images/4bad2a41-861c-4981-890b-7dcdfae29d20.jpg";

function Menu() {
  //---Get Pathname And Id----//
  let { pathname } = useLocation();
  const id = pathname.split("/")[2];
  pathname = pathname.split("/")[1];
  const dispatch = useDispatch();
  //---show Modal----//
  const AddChildHandler = () => {
    dispatch(ToggleAction.ToggleModal("child"));
  };
  //-----Select Data From Store-----//
  const Children = useSelector<RootState, ChildDataType[]>(
    (state) => state.Children.ChildData
  );
  const idParent = useSelector<RootState, string>(
    (state) => state.Data.ParentId
  );
  const Parents = useSelector<RootState, ParentType[]>(
    (state) => state.Data.Parents
  );

  const Progress = useSelector<RootState, ProgressChildType[]>(
    (state) => state.Data.progressChild
  );
  const Subjects = useSelector<RootState, subjectType[]>(
    (state) => state.Data.subjects
  );
  //-----dispatch Data -----//
  useEffect(() => {
    dispatch(SubjectsAction.getSubjectsProg({ id, Progress, Subjects }));
    dispatch(ChildrenAction.GetChildren({ Parents, idParent }));
    dispatch(ChildrenAction.resetChild());
  }, [dispatch, id, Progress, Subjects, Parents, idParent]);

  return (
    <div className="menu">
      <Tiltle text="Mes enfants" />
      <div className="childs">
        <div className="add__child" onClick={AddChildHandler}>
          <span>
            <p>+</p>
          </span>
        </div>
        {Children.map((child) => {
          return (
            <NavLink to={`${pathname}/${child.id}`} key={child.id}>
              <Card className="child">
                <img src={user} alt="" className="resizeImg" />
                <div className="child-info">
                  <p>{child.FirstName}</p>
                  <p>id: {child.identifier}</p>
                </div>
              </Card>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
