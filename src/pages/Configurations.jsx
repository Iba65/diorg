import React, { useEffect, useContext } from "react";
import "./../css/configuration.css";
import { PrimaryMenu } from "../components/configuraciones/PrimaryMenu";
import { HermanosForm } from "../components/configuraciones/HermanosForm";
import { useLocalStorage } from "../common/hooks/useLocalStorage";
import { GeneralContext } from "../common/context/general/GeneralContext";
import { InfoWindow } from "../components/configuraciones/InfoWindow";

export const Configurations = () => {
  const { GeneralState } = useContext(GeneralContext);
  const { postStorageValues } = useLocalStorage();

  useEffect(() => {
    console.log("value en entrada -->", GeneralState);
    return () => {
      postStorageValues("generalState", GeneralState);
    };
  }, []);

  return (
    <>
      <PrimaryMenu />
      <HermanosForm />
      <div className="infoWindow">
        <InfoWindow />
      </div>
    </>
  );
};
