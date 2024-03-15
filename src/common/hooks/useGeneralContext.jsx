import React, { useState, useContext, useEffect } from "react";
import { GeneralContext } from "../context/general/GeneralContext";
import { isAddress } from "./../utils/functionsUseGeneral";

export const useGeneralContext = () => {
  const { GeneralState, GeneralDispatch } = useContext(GeneralContext);
  const [saved, setSaved] = useState(false);

  /*useEffect(() => {
    console.log("contexto general -->", GeneralState);
  }, [GeneralState]);*/

  const isRelationId = (id) => {
    let relatData = {};
    const relat = GeneralState.relations.find((rel) => rel.idr === id);
    if (undefined !== relat) {
      relatData = relat;
    }
    return relatData;
  };
  /*const getLastIdher = () => {
    const lastIdbro = parseInt(GeneralState.counterIds.brothers) + 1;
    return parseInt(lastIdbro);
  };*/

  const getIdbroGroup = (idbro) => {
    let idGroup = 0;
    GeneralState.groups.map((grup) => {
      if (idGroup === 0) {
        const isBroGroup = grup.memGrup.find((her) => her.idBro === idbro);
        if (undefined !== isBroGroup) {
          idGroup = grup.idGrup;
        }
      }
    });
    return idGroup;
  };

  const getSimilarAddress = (dir) => {
    if (dir.length <= 0) return [];
    if (!isAddress(dir, GeneralState)) {
      return GeneralState.addreses.filter((add) => add.includes(dir));
    } else {
      return [];
    }
  };

  const updateContextBro = (data) => {
    //*
    //* grabacion en fichero relations
    //* -------------------------------------
    if (Object.keys(GeneralState.temp.relations).length > 0) {
      const payloadRel = GeneralState.temp.relations;
      if (GeneralState.temp.relnew) {
        GeneralDispatch({
          type: "CREATE_RELATION",
          payload: payloadRel,
        });
        GeneralDispatch({
          type: "PLUS_COUNTER_REL",
          payload: "",
        });
      } else {
        GeneralDispatch({
          type: "ADD_MEMBER",
          payload: payloadRel,
        });
      }
      GeneralDispatch({
        type: "PUT_TEMP_RELATIONS",
        payload: { data: {}, new: false },
      });
    }

    //* actualiza fotos
    //* ----------------------
    GeneralDispatch({
      type: "UPDATE_FOTOS",
      payload: { id: data.fotoId, idBro: data.idHer },
    });

    //*
    //* --> grabación en fichero Hermanos
    //* ------------------------------------------
    const payload = {
      id: data.idHer,
      nameBro: data.nombHer,
      fotoId: parseInt(data.fotoId) + 1,
      dirBro: data.dirHer,
      tlfBro: data.tlfnHer,
      priviBro: data.privi,
      isRepaux: data.auxiliar,
      isRepreg: data.regular,
      idRelation: data.idRel,
      idGroup: data.idGrupo,
    };
    //console.log("------>", payload);

    GeneralDispatch({
      type: "ADD_BROTHER",
      payload: payload,
    });
    GeneralDispatch({
      type: "PLUS_COUNTER_BRO",
      payload: data.idHer,
    });
    if (!isAddress(data.dirHer, GeneralState)) {
      GeneralDispatch({
        type: "ADD_ADDRESS",
        payload: data.dirHer,
      });
    }
  };

  const updateContextRel = (data, isRelation) => {
    let payload = {};
    if (!isRelation) {
      payload = {
        idr: data.idRelat,
        tipo: data.nombRel,
        members: [
          {
            idm: data.idMem,
            nom: data.nomMem,
            pos: data.tipRel,
          },
        ],
      };
      GeneralDispatch({
        type: "PUT_TEMP_RELATIONS",
        payload: { data: payload, new: true },
      });
    } else {
      payload = {
        id: data.idRelat,
        idm: data.idMem,
        nom: data.nomMem,
        pos: data.tipRel,
      };
      GeneralDispatch({
        type: "PUT_TEMP_RELATIONS",
        payload: { data: payload, new: false },
      });
    }
  };

  return {
    GeneralState,
    saved,
    GeneralDispatch,
    isRelationId,
    getIdbroGroup,
    updateContextBro,
    updateContextRel,
    getSimilarAddress,
    setSaved,
  };
};
