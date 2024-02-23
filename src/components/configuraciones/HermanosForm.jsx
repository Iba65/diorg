import React, { useEffect, useState } from "react";
import "./../../css/hermanosForm.css";
import "./../../css/generalForm.css";
import ClockLoader from "react-spinners/ClockLoader";
import { cancelar } from "./../../common/utils/images";
import { privileg } from "../../common/utils/auxiliares";
import { useGeneralContext } from "../../common/hooks/useGeneralContext";
import { RelationShipForm } from "./RelationShipForm";
import { ErrorForm } from "../generales/ErrorForm";
import { clearState } from "./../../common/utils/funtionsUtils";
import {
  validaFormBro,
  tlfValid,
} from "./../../common/utils/functionsUseGeneral";
import { AddresesView } from "./AddresesView";

export const HermanosForm = () => {
  const {
    GeneralState,
    saved,
    GeneralDispatch,
    isRelationId,
    getIdbroGroup,
    updateContextBro,
    updateContextRel,
    getSimilarAddress,
    setSaved,
  } = useGeneralContext();
  const [idHer, setIdHer] = useState(0);
  const [nombHer, setNombHer] = useState("");
  const [dirHer, setDirHer] = useState("");
  const [tlfnHer, setTlfnHer] = useState("");
  const [privi, setPrivi] = useState(null);
  const [auxiliar, setAuxiliar] = useState(false);
  const [idRel, setIdRel] = useState(0);
  const [idGrupo, setGrupo] = useState(0);
  const [forelView, setForelView] = useState(false);
  const [selRelat, setSelRelat] = useState({});
  const [isRelat, setIsRelat] = useState(false);
  const [isRelbro, setIsRelbro] = useState(false);
  const [errors, setErrors] = useState({});
  const [direct, setDirect] = useState([]);

  useEffect(() => {
    if (Object.keys(GeneralState.errors).length > 0) {
      setErrors({ ...errors, ...GeneralState.errors });
    }
  }, [GeneralState.errors]);

  useEffect(() => {
    if (idHer === 0 || idHer === "0") {
      setIdHer(GeneralState.counterIds.brothers + 1);
    }
  }, [idHer]);

  useEffect(() => {
    setDirect(getSimilarAddress(dirHer));
  }, [dirHer]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setTimeout(() => {
        setErrors({});
        GeneralDispatch({
          type: "ADD_ERROR",
          payload: {},
        });
      }, 5000);
    }
  }, [errors]);

  const nomToEqual = (nomb, idh) => {
    if (idRel !== 0) {
      const relation = GeneralState.relations.find((rel) => rel.idr === idRel);
      if (undefined !== relation) {
        const nomrel = relation.members.find((men) => men.idm === idh);
        if (undefined !== nomrel) {
          if (nomb !== nomrel.nom) {
            //cambia nombre
            GeneralDispatch({
              type: "CHANGE_NAME_BRO",
              payload: {
                id: idRel,
                idm: idh,
                nom: nomb,
              },
            });
          }
        }
      }
    }
  };

  useEffect(() => {
    if (parseInt(idRel) !== 0 && idRel !== "") {
      if (nombHer !== "") {
        const relation = GeneralState.relations.find(
          (rel) => rel.idr === idRel
        );
        if (undefined !== relation) {
          setIsRelat(true);
          setSelRelat({
            idr: relation.idr,
            tipo: relation.tipo,
            nomher: nombHer,
          });
          const relatbro = relation.members.find((bro) => bro.idm === idHer);
          if (undefined !== relatbro) {
            serIsRelbro(true);
          } else {
            setIsRelbro(false);
          }
        } else {
          setIsRelat(false);
          setIsRelbro(false);
          setSelRelat({
            idr: idRel,
            tipo: "",
            nomher: nombHer,
          });
          setForelView(false);
        }
        setForelView(true);
      } else {
        setIdRel(0);
        setErrors({
          ...errors,
          relation: {
            tipo: "error",
            state: true,
            msg: "Para crear relación debe de haber introducido el nombre del hermano/a",
          },
        });
        setTimeout(() => {
          setErrors({});
          GeneralDispatch({
            type: "ADD_ERROR",
            payload: errors,
          });
        }, 4000);
      }
    }
  }, [idRel]);

  const updateBrothers = () => {
    setGrupo(getIdbroGroup(idHer));
    nomToEqual(nombHer, idHer);
    if (
      !validaFormBro(
        {
          idHer,
          nombHer,
          dirHer,
          tlfnHer,
          privi,
          auxiliar,
          idRel,
          idGrupo,
        },
        GeneralDispatch
      )
    ) {
      setSaved(true);
      updateContextBro({
        idHer,
        nombHer,
        dirHer,
        tlfnHer,
        privi,
        auxiliar,
        idRel,
        idGrupo,
      });
      setTimeout(() => {
        clearState([setNombHer, setDirHer, setTlfnHer], "");
        clearState([setPrivi], null);
        clearState([setAuxiliar], false);
        clearState([setIdHer, setIdRel, setGrupo], 0);
        setErrors({});
        setSaved(false);
      }, 2000);
    }
  };

  return (
    <div className="formh">
      <h2>Formulario Archivo Hermanos</h2>
      <form>
        <div className="headform pb10">
          <fieldset className="headCustom">
            <label htmlFor="idHer" className="headLabel">
              ID Hermano
            </label>
            <input
              className="fieldId"
              id="idHer"
              name="idHer"
              type="text"
              value={idHer}
              size="1"
              readOnly
              //onInput={(e) => setIdHer(e.target.value)}
            />
          </fieldset>
          <fieldset className="headCustom">
            <label htmlFor="idGrupo" className="headLabel">
              ID Grupo
            </label>
            <input
              className="fieldId"
              id="idGrupo"
              name="idGrupo"
              type="text"
              value={idGrupo}
              size="1"
              readOnly
            />
          </fieldset>
        </div>
        <fieldset className="custom pt15">
          <label htmlFor="nombHer">Nombre Hermano</label>
          <input
            id="nombHer"
            name="nombHer"
            type="text"
            value={nombHer}
            size="25"
            onInput={(e) => setNombHer(e.target.value)}
          />
          <img
            className={
              nombHer !== "" ? "borrarEntrada" : "borrarEntrada borenHidden"
            }
            src={cancelar}
            alt="cancelar"
            onClick={() => setNombHer("")}
          />
        </fieldset>
        <div className="fielderr">
          {errors.nombHer ? <ErrorForm error={errors.nombHer} /> : null}
        </div>
        <fieldset className="custom">
          <label htmlFor="dirHer">Dirección</label>
          <input
            id="dirHer"
            name="dirHer"
            type="text"
            value={dirHer}
            size="50"
            onInput={(e) => setDirHer(e.target.value)}
          />
          <img
            className={
              dirHer !== "" ? "borrarEntrada" : "borrarEntrada borenHidden"
            }
            src={cancelar}
            alt="cancelar"
            onClick={() => setDirHer("")}
          />
        </fieldset>
        <div className="fielderr">
          {errors.dirHer ? <ErrorForm error={errors.dirHer} /> : null}
        </div>
        <fieldset className="custom">
          <label htmlFor="tlfnHer">Telefono</label>
          <input
            name="tlfnHer"
            type="text"
            value={tlfnHer}
            size="12"
            onInput={(e) => tlfValid(e, setTlfnHer)}
          />
          <img
            className={
              tlfnHer !== "" ? "borrarEntrada" : "borrarEntrada borenHidden"
            }
            src={cancelar}
            alt="cancelar"
            onClick={() => setTlfnHer("")}
          />
        </fieldset>
        <div className="fielderr">
          {errors.tlfnHer ? <ErrorForm error={errors.tlfnHer} /> : null}
        </div>
        <fieldset>
          <label htmlFor="privilegio" className="mr10">
            Privilégio
          </label>
          <legend>Privilegios</legend>
          <select
            className="m10"
            name="privilegio"
            value={privi !== null ? privi : 0}
            onChange={(e) => setPrivi(e.target.value)}
          >
            <option value="">Seleccione...</option>
            {privileg.length > 0
              ? privileg.map((prive) => (
                  <option value={prive.priv} key={prive.id}>
                    {prive.priv}
                  </option>
                ))
              : null}
          </select>
          <div className="mb10 mt10">
            <label htmlFor="auxiliar">Precursor Auxiliar</label>
            <input
              type="checkbox"
              id="auxiliar"
              name="auxiliar"
              checked={undefined !== auxiliar ? auxiliar : false}
              onChange={() => setAuxiliar(!auxiliar)}
            />
          </div>
        </fieldset>
        <div className="fielderr">
          {errors.privi ? <ErrorForm error={errors.privi} /> : null}
        </div>
        <fieldset className="custom mt10">
          <label htmlFor="idRel">ID Relacion</label>
          <input
            name="idRel"
            type="text"
            value={idRel}
            size="1"
            onInput={(e) => setIdRel(e.target.value)}
          />
        </fieldset>
        {errors.relation ? <ErrorForm error={errors.relation} /> : null}
        <div className="buttonGroup mt10 mb5">
          <button
            className="fondoOcre bcOcre textNavy"
            type="button"
            onClick={() => updateBrothers()}
          >
            {saved ? (
              <div className="saved">
                Guardando
                <ClockLoader
                  color="navy"
                  cssOverride={{
                    margin: "0px 10px",
                    textAlign: "center",
                  }}
                  loading
                  size={26}
                />
              </div>
            ) : (
              <>Validar</>
            )}
          </button>
        </div>
      </form>
      {forelView && nombHer !== "" ? (
        <div className="relContainer">
          <RelationShipForm
            idHer={idHer}
            isRelat={isRelat}
            isRelbro={isRelbro}
            selRelat={selRelat}
            GeneralState={GeneralState}
            setIdRel={setIdRel}
            setForelView={setForelView}
            isRelationId={isRelationId}
            GeneralDispatch={GeneralDispatch}
            updateContextRel={updateContextRel}
          />
        </div>
      ) : null}
      {direct.length > 0 ? (
        <div className="directContainer">
          <AddresesView
            addata={direct}
            setDirect={setDirect}
            setDirHer={setDirHer}
          />
        </div>
      ) : null}
    </div>
  );
};
