import React, { useContext } from "react";
import "./../css/configuration.css";
import { PrimaryMenu } from "../components/configuraciones/PrimaryMenu";
import { HermanosForm } from "../components/configuraciones/HermanosForm";
import { InfoWindow } from "../components/configuraciones/InfoWindow";
import { ScreenContext } from "./../common/context/screen/ScreenContext";
import { DataWindow } from "../components/configuraciones/dataWindow";
import { GruposForm } from "../components/configuraciones/gruposData/GruposForm";

export const Configurations = () => {
  const { ScreenState, ScreenDispatch } = useContext(ScreenContext);
  return (
    <div className="confiContainer">
      <PrimaryMenu ScreenDispatch={ScreenDispatch} />
      <div className="formWindow">
        {ScreenState.screenDataActive ? <DataWindow /> : null}
        {ScreenState.screenBroActive ? <HermanosForm /> : null}
        {ScreenState.screenGruActive ? <GruposForm /> : null}
      </div>
      <div className="infoWindow">
        <InfoWindow />
      </div>
    </div>
  );
};
