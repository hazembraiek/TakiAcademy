import React from "react";
import home from "./../../Assets/Icons/home.2ee1110a.svg";
import examen from "./../../Assets/Icons/File.svg";
import card from "./../../Assets/Icons/credit-card-solid.svg";
import video from "./../../Assets/Icons/Video.svg";
import list from "./../../Assets/Icons/list-ul-solid.svg";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";

function SideBar() {
  const SettingOpen = useSelector<RootState, boolean>(
    (state) => state.Toggle.Setting
  );
  return (
    <div className={`sidebar ${SettingOpen ? "activeSetting" : ""}`}>
      <nav>
        <ul>
          <NavLink to="/home">
            <li>
              <div className="sidebar__icon">
                <img src={home} alt="" className="mediumSizeImg" />
              </div>
              <p>Accueil</p>
            </li>
          </NavLink>
          <NavLink to="/live-videos">
            <li>
              <div className="sidebar__icon">
                <img src={video} alt="" className="mediumSizeImg" />
              </div>
              <p>En direct</p>
            </li>
          </NavLink>
          <NavLink to="/sessions-plan">
            <li>
              <div className="sidebar__icon">
                <img alt="" src={list} className="mediumSizeImg" />
              </div>
              <p>Travail a faire</p>
            </li>
          </NavLink>
          <NavLink to="/examens">
            <li>
              <div className="sidebar__icon">
                <img src={examen} alt="" className="mediumSizeImg" />
              </div>
              <p>Examens</p>
            </li>
          </NavLink>
          <NavLink to="/porte-monnaie">
            <li>
              <div className="sidebar__icon">
                <img alt="" src={card} className="mediumSizeImg" />
              </div>
              <p>Porte monnaie</p>
            </li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
}

export default SideBar;
