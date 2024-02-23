import React from "react";
import "./../../css/primaryMenu.css";
import { personal, equipo, limpiezum } from "./../../common/utils/images";

export const PrimaryMenu = () => {
  return (
    <div className="primaryMenuContainer">
      <ul className="upmenu">
        <li>
          <img className="icomenu" src={personal} alt="hermanos" />
          <p>Hermanos</p>
        </li>
        <li>
          <img className="icomenu" src={equipo} alt="equipo" />
          <p>Grupos</p>
        </li>
        <li>
          <img className="icomenu" src={limpiezum} alt="limpieza" />
          <p>Limpieza</p>
        </li>
      </ul>
    </div>
  );
};
