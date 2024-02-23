import React, { useEffect, useContext } from "react";
import { limpieza, configura } from "./../common/utils/images";
import { useLocalStorage } from "../common/hooks/useLocalStorage";
import { initGeneralState } from "../common/utils/auxiliares";
import { GeneralContext } from "../common/context/general/GeneralContext";

export const LateralMenu = ({ setOpc }) => {
  const { GeneralDispatch } = useContext(GeneralContext);
  const { getStorageValues } = useLocalStorage();

  useEffect(() => {
    GeneralDispatch(getStorageValues("generalState", initGeneralState));
  }, []);

  return (
    <>
      <div className="title-1">M</div>
      <ul className="lateral">
        <li onClick={() => setOpc(0)}>
          <h3>Limpieza</h3>
          <div className="menuIconOption">
            <img src={limpieza} alt="limpieza" />
          </div>
        </li>
        <li onClick={() => setOpc(1)}>
          <h3>Comfiguración</h3>
          <div className="menuIconOption">
            <img src={configura} alt="limpieza" />
          </div>
        </li>
      </ul>
    </>
  );
};
