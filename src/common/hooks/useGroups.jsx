import React, { useState, useContext, useEffect } from "react";
import { GeneralContext } from "../context/general/GeneralContext";
import { isEmpty } from "./../utils/funtionsUtils";
import { isGroup } from "./../../services/contextServices";

export const useGroups = () => {
  const { GeneralState, GeneralDispatch } = useContext(GeneralContext);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState({});

  const validateGroupsData = (Data) => {
    let errData = false;
    let errors = {};
    const { idGru, idSuperint, idAuxiliar, listBrog } = Data;
    if (isEmpty(idGru)) {
      errData = true;
      errors.idGru = {
        tipo: "error",
        state: true,
        msg: "El numero del grupo no puede ser 0, ni estar vacio.",
      };
    }
    if (isEmpty(idSuperint)) {
      errData = true;
      errors.idSuperint = {
        tipo: "error",
        state: true,
        msg: "Debe seleccionar un Superintendente de grupo.",
      };
    }
    if (isEmpty(idAuxiliar)) {
      errData = true;
      errors.idAuxiliar = {
        tipo: "error",
        state: true,
        msg: "Debe seleccionar un auxiliar de grupo.",
      };
    }
    if (isEmpty(listBrog)) {
      errData = true;
      errors.idAuxiliar = {
        tipo: "error",
        state: true,
        msg: "El grupo debe de tener al menos un integrante.",
      };
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    }
    return errData;
  };

  const updateContextGroup = (data) => {
    const {
      idGru,
      nomGru,
      idSuperint,
      nomSuperint,
      idAuxiliar,
      nomAuxiliar,
      listBrog,
    } = data;
    if (isGroup(GeneralState.groups, idGru)) {
      console.log("ya existe");
    } else {
      const newList = listBrog.map((bro) => {
        return {
          idBro: bro.id,
          nomBro: bro.name,
          tipo: "asistente",
        };
      });
      newList.unshift({
        idBro: idAuxiliar,
        nomBro: nomAuxiliar,
        tipo: "Auxiliar",
      });
      newList.unshift({
        idBro: idSuperint,
        nomBro: nomSuperint,
        tipo: "Superintendente",
      });
      GeneralDispatch({
        type: "ADD_GROUP",
        payload: {
          idGrup: idGru,
          nomGrup: nomGru,
          memGrup: newList,
        },
      });
      GeneralDispatch({
        type: "PLUS_COUNTER_GRU",
        payload: "",
      });
    }
  };
  return {
    GeneralState,
    saved,
    errors,
    validateGroupsData,
    setErrors,
    setSaved,
    updateContextGroup,
  };
};
