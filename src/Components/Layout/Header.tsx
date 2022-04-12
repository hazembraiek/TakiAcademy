import React from "react";
import setting from "./../../Assets/Icons/bars-solid.svg";
import logo from "./../../Assets/Images/logo.b742634d.svg";
import search from "./../../Assets/Icons/magnifying-glass-solid.svg";
import money from "./../../Assets/Icons/wallet.e916e79d.svg";
import message from "./../../Assets/Icons/email.d747375d.svg";
import angle from "./../../Assets/Icons/angle-down-solid.svg";
import DefaultPhoto from "./../../Assets/Images/avatar-1577909_960_720.webp";
import { useDispatch } from "react-redux";
import { ToggleAction } from "../../Store/Slices/TogglinData";
import Logout from "../../Utils/LogoutUser";

function Header() {
  const dispatch = useDispatch();
  const SettingHandle = () => {
    dispatch(ToggleAction.ToggleSetting());
  };
  return (
    <header className="header">
      <div className="header__setting-logo">
        <div className="setting" onClick={SettingHandle}>
          <img src={setting} alt="settingBtn" className="resizeImg" />
        </div>
        <div className="logo">
          <img src={logo} alt="Logo" />
          <span>TakiAcademy</span>
        </div>
      </div>
      <div className="header__input-userInfo">
        <div className="input">
          <div className="search-icon">
            <img src={search} alt="search" className="smallSizeImg" />
          </div>
          <div className="search-input">
            <input
              type="search"
              placeholder="Chercher Cours examens, exercices..."
            />
          </div>
        </div>
        <div className="user-Info">
          <div className="money">
            <div className="money__icon">
              <img src={money} alt="" className="resizeImg" />
            </div>
            <div className="money__description">
              <p>Votre solid</p>
              <p>0 Pts</p>
            </div>
          </div>
          <div className="message">
            <div className="message__icon">
              <img src={message} alt="" className="resizeImg" />
            </div>
            <div className="message__number">
              <p>0</p>
            </div>
          </div>
          <div className="profile" onClick={() => Logout()} title="Déconnecter">
            <div className="profile__img">
              <img src={DefaultPhoto} alt="" className="resizeImg" />
            </div>
            <div className="profile__info">
              <p>Hazem Brayek</p>
              <p>Bac Informatique</p>
            </div>
            <span>
              <img src={angle} alt="" className="smallSizeImg" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
