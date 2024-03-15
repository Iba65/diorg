import React from "react";
import "./../../css/primaryMenu.css";
import { personal, equipo, limpiezum } from "./../../common/utils/images";
import { setOption } from "../../common/utils/functionsUseGeneral";

export const PrimaryMenu = ({ ScreenDispatch }) => {
  return (
    <div className="primaryMenuContainer">
      <ul className="upmenu">
        <li onClick={() => setOption(ScreenDispatch, "1")}>
          <img className="icomenu" src={personal} alt="hermanos" />
          <p>Hermanos</p>
        </li>
        <li onClick={() => setOption(ScreenDispatch, "3")}>
          <img className="icomenu" src={equipo} alt="equipo" />
          <p>Grupos</p>
        </li>
        <li onClick={() => setOption(ScreenDispatch, "4")}>
          <img className="icomenu" src={limpiezum} alt="limpieza" />
          <p>Limpieza</p>
        </li>
      </ul>
    </div>
  );
};
