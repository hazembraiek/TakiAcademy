import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { ToggleAction } from "../../Store/Slices/TogglinData";
import Angle from "./../../Assets/Icons/angle-down-solid.svg";

type PagginationType = {
  PagginationMax: Number;
};

function Pagination({ PagginationMax }: PagginationType) {
  let Pagination = useSelector<RootState, Number>(
    (state) => state.Toggle.Paggination
  );
  const Page = useSelector<RootState, Number>(
    (state) => state.Toggle.PagginationPage
  );
  const dispatch = useDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = +event.target.value;
    dispatch(ToggleAction.SetPaggination(value));
    dispatch(ToggleAction.resetPage());
  };
  const DecrementPage = () => {
    dispatch(ToggleAction.UpdatePage({ Event: "Decre", Max: PagginationMax }));
  };
  const incrementPage = () => {
    dispatch(ToggleAction.UpdatePage({ Event: "Incre", Max: PagginationMax }));
  };

  if (PagginationMax < Pagination) Pagination = PagginationMax;
  const DataPass =
    +Page * +Pagination > PagginationMax
      ? +PagginationMax - +Pagination
      : +Page * +Pagination - (+Page - 1) * +Pagination;

  return (
    <div className="Pagination">
      <p>Lignes par page:</p>
      <select onChange={handleChange} defaultValue={+Pagination}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </select>
      <p>
        {Page} - {DataPass} sur {PagginationMax}
      </p>
      <div className="icons">
        <span className="icons__left" onClick={DecrementPage}>
          <img src={Angle} alt="" className="smallSizeImg" />
        </span>
        <span className="icons__right" onClick={incrementPage}>
          <img src={Angle} alt="" className="smallSizeImg" />
        </span>
      </div>
    </div>
  );
}

export default Pagination;
