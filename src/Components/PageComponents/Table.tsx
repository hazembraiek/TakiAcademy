import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { columns, TableType } from "../../models/ComponentsTypes";
import { RootState } from "../../Store";
import { ToggleAction } from "../../Store/Slices/TogglinData";
import Download from "../Download/Download";
import Angle from "./../../Assets/Icons/angle-down-solid.svg";

type itemType = {
  item: columns;
};

function RowItems({ item }: itemType) {
  return <th>{item.heading}</th>;
}

function DetailLive({ LiveDetail, items, id, LiveIdClicked }) {
  return (
    <tr
      className="LiveDetail"
      id={`${LiveDetail && id === LiveIdClicked ? "Activetd" : ""}`}
    >
      <td colSpan={4}>
        <div className="test">
          <div className="LiveDetail__info">
            <p className="prof">Par Professeur : {items.prof}</p>
            <p>
              Niveaux:
              <span>Niveaux 1</span>
              <span>Niveaux 2</span>
              <span>Niveaux 3</span>
            </p>
          </div>
          <div className="LiveDetail__download">
            <p>Piéces jointes</p>
            <Download title="Fichier n 1" />
            <Download title="Fichier n 2" />
          </div>
        </div>
      </td>
    </tr>
  );
}

function Table({ columns, id, ArrayData }: TableType) {
  const Page = useSelector<RootState, Number>(
    (state) => state.Toggle.PagginationPage
  );
  const LiveDetail = useSelector<RootState, boolean>(
    (state) => state.Toggle.liveDetails
  );

  const Pagination = useSelector<RootState, Number>(
    (state) => state.Toggle.Paggination
  );

  const LiveIdClicked = useSelector<RootState, string>(
    (state) => state.Toggle.idLive
  );

  const dispatch = useDispatch();
  ArrayData = ArrayData.map((el) => {
    return {
      ...el,
      date: `${new Date(el.date).toLocaleDateString()} ${new Date(
        el.date
      ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
    };
  });
  let LivePage = false;
  if (id) {
    ArrayData = ArrayData?.slice(-3)?.map((el) => {
      return { ...el, date: el.date.split(" ")[0] };
    });
  } else if (columns.length < 4) {
    ArrayData = ArrayData?.slice(-3);
  } else if (columns.length === 4) {
    LivePage = true;
  }

  const ClickIconHandler = (id: string) => {
    if (LivePage) {
      if (id === LiveIdClicked) {
        dispatch(ToggleAction.ToggleLiveDetail(id));
      } else {
        dispatch(ToggleAction.hide());
        dispatch(ToggleAction.ToggleLiveDetail(id));
      }
    }
  };

  if (columns.length >= 4)
    ArrayData = ArrayData.slice((+Page - 1) * +Pagination, +Page * +Pagination);

  return (
    <table id={id}>
      <thead>
        <tr>
          {columns.map((item, i) => (
            <RowItems item={item} key={i} />
          ))}
        </tr>
      </thead>
      <tbody>
        {ArrayData?.map((items, i) => {
          return (
            <React.Fragment key={i}>
              <tr>
                {columns.map((data, i) => {
                  return (
                    <td
                      key={i + 1}
                      style={{ width: `calc(100% / ${columns.length})` }}
                    >
                      {items[data.value!] &&
                      typeof items[data.value!] !== "boolean" ? (
                        items[data.value!]
                      ) : (
                        <img
                          src={
                            LiveDetail && items.id === LiveIdClicked
                              ? Angle
                              : data.value
                          }
                          alt=""
                          className="mediumSizeImg"
                          onClick={() => ClickIconHandler(items.id!)}
                        />
                      )}
                    </td>
                  );
                })}
              </tr>
              {LivePage && (
                <DetailLive
                  LiveDetail={LiveDetail}
                  items={items}
                  id={items.id}
                  LiveIdClicked={LiveIdClicked}
                />
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
