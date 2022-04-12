import React from "react";
import Tiltle from "../../Components/PageComponents/Tiltle";
import Card from "../../UI/Card";
import iconButton from "./../../Assets/Icons/money.png";
import MoneyBag from "./../../Assets/Icons/money-bag.a9524cd4.svg";
import D17 from "./../../Assets/Icons/d17.5241fb9f.png";
import CreditCard from "./../../Assets/Icons/credit-card.93e313e3.svg";
import { useDispatch, useSelector } from "react-redux";
import { ToggleAction } from "../../Store/Slices/TogglinData";
import Pagination from "../../Components/pagination/Pagination";
import Table from "../../Components/PageComponents/Table";
import {
  HistoryPointsCol,
  HistoryTransPointsCol,
} from "./../../Utils/ColumnsTable";
import { RootState } from "../../Store";
import { HistoryPointsType } from "../../models/ComponentsTypes";
import GetData from "../../Utils/GetAllData";

type BanquePropsType = {
  banque: string;
  RIB: string;
  type?: string;
};

type ButtonPaymentType = {
  text: string;
  Color?: string;
  icon?: string;
  onClick?: () => void;
};

const Banque = ({ banque, RIB, type = "banque" }: BanquePropsType) => {
  const content =
    type === "banque" ? (
      <>
        <p className="name-banque">Banque {banque}</p>
        <p>
          Account:<span> TakiAcademy</span>
        </p>
        <p>
          RIB: <span> {RIB}</span>
        </p>
      </>
    ) : (
      <>
        <p className="name-banque">La poste tunisienne</p>
        <p>
          Account: <span>5359 4017 2354 0098</span>
        </p>
      </>
    );
  return <div className="account-item">{content}</div>;
};

const ButtonPoints = ({ text, onClick }: ButtonPaymentType) => {
  return (
    <div className="button" onClick={onClick}>
      <div className="button__icon">
        <img src={iconButton} alt="money" className="resizeImg" />
      </div>
      <p className="button__text">{text}</p>
    </div>
  );
};

const Payment = ({ text, Color, icon }: ButtonPaymentType) => {
  return (
    <div className="payment-method">
      <img src={icon} alt="" className={Color} />
      <p>{text}</p>
    </div>
  );
};

function MoneyTransfer() {
  const dispatch = useDispatch();
  let HistoryPoints = useSelector<RootState, HistoryPointsType[]>(
    (state) => state.Data.HistoryPoints
  );
  const idParent = useSelector<RootState, string>(
    (state) => state.Data.ParentId
  );

  HistoryPoints = GetData(idParent, HistoryPoints, "idParent");
  return (
    <div className="money">
      <div className="money__services">
        <Card className="money__info-account">
          <Tiltle text="Porte monnaie" />
          <div className="banque">
            <div className="banque-info">
              <Banque banque="zitouna" RIB="25 006 0000000317041 86" />
              <Banque banque="biat" RIB="08 139 0310110000790 88" />
              <Banque
                banque="zitouna"
                RIB="25 006 0000000317041 86"
                type="post"
              />
            </div>
            <div className="banque-trans">
              <div className="balance">
                <p>Mon solde:</p>
                <p className="points">1 Pts</p>
              </div>
              <ButtonPoints
                text="Tranférer des points"
                onClick={() => dispatch(ToggleAction.ToggleModal("trans"))}
              />
            </div>
          </div>
        </Card>
        <Card className="money__transfer">
          <Tiltle text="Services" />
          <p className="title">Charger mon compte</p>
          <div className="payment">
            <Payment
              text="Versement bancaire"
              Color="color-one"
              icon={MoneyBag}
            />
            <Payment text="D17" Color="color-two" icon={D17} />
            <Payment
              text="Paiement en ligne"
              Color="color-three"
              icon={CreditCard}
            />
          </div>
          <ButtonPoints
            text="Ajouter des points"
            onClick={() => dispatch(ToggleAction.ToggleModal("Add"))}
          />
        </Card>
      </div>
      <Card className="money__points-history">
        <Tiltle text="Historique des points" />
        <Table columns={HistoryPointsCol} ArrayData={HistoryPoints} />
        <Pagination PagginationMax={HistoryPoints.length} />
      </Card>
      <Card className="money__points-trans--history">
        <Tiltle text="Historique de transfert des points" />
        <Table columns={HistoryTransPointsCol} ArrayData={HistoryPoints} />
        <Pagination PagginationMax={HistoryPoints.length} />
      </Card>
    </div>
  );
}

export default MoneyTransfer;
