import React, { useContext, useEffect, useState } from "react";
import "./../../css/hermanosForm.css";
import "./../../css/generalForm.css";
import ClockLoader from "react-spinners/ClockLoader";
import { ScreenContext } from "../../common/context/screen/ScreenContext";
import { cancelar, buscar, check } from "./../../common/utils/images";
import { privileg } from "../../common/utils/auxiliares";
import { useGeneralContext } from "./../../common/hooks/useGeneralContext";
import { useLocalStorage } from "./../../common/hooks/useLocalStorage";
import { RelationShipForm } from "./RelationShipForm";
import { ErrorForm } from "../generales/ErrorForm";
import { clearState } from "./../../common/utils/funtionsUtils";
import {
  validaFormBro,
  tlfValid,
  numValid,
  setOption,
} from "./../../common/utils/functionsUseGeneral";
import { AddresesView } from "./AddresesView";
import { AvisoModal } from "../modals/AvisoModal";
import { FindModal } from "./../modals/FindModal";
import { FotoView } from "./complements/FotoView";

export const HermanosForm = () => {
  const { ScreenDispatch } = useContext(ScreenContext);
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
  const { postStorageValues } = useLocalStorage();
  const [imgsBro, setImgsBro] = useState([]);
  const [idHer, setIdHer] = useState(0);
  const [nombHer, setNombHer] = useState("");
  const [fotoId, setFotoId] = useState(0);
  const [dirHer, setDirHer] = useState("");
  const [tlfnHer, setTlfnHer] = useState("");
  const [privi, setPrivi] = useState(null);
  const [auxiliar, setAuxiliar] = useState(false);
  const [regular, setRegular] = useState(false);
  const [idRel, setIdRel] = useState(0);
  const [idGrupo, setGrupo] = useState(0);
  const [forelView, setForelView] = useState(false);
  const [selRelat, setSelRelat] = useState({});
  const [isRelat, setIsRelat] = useState(false);
  const [isRelbro, setIsRelbro] = useState(false);
  const [errors, setErrors] = useState({});
  const [direct, setDirect] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalFind, setModalFind] = useState(false);
  const [fotop, setfotop] = useState(80);
  const [foright, setforight] = useState(1271);
  const [dirtop, setDirtop] = useState(0);
  const [diright, setDiright] = useState(0);
  const [telright, setTelright] = useState(0);

  const clearfields = () => {
    clearState([setNombHer, setDirHer, setTlfnHer], "");
    clearState([setPrivi], null);
    clearState([setAuxiliar, setRegular], false);
    clearState([setIdHer, setFotoId, setIdRel, setGrupo], 0);
    setErrors({});
    setSaved(false);
  };

  const calculatePos = () => {
    const container = document.getElementById("formh");
    setfotop(container.getBoundingClientRect().top + 5);
    setforight(container.getBoundingClientRect().right - 105);
    const field = document.getElementById("dirh");
    setDirtop(field.getBoundingClientRect().top + 30);
    setDiright(field.getBoundingClientRect().left - 5);
    const field2 = document.getElementById("telh");
    setTelright(field2.getBoundingClientRect().right + 15);
  };

  useEffect(() => {
    window.addEventListener("resize", calculatePos);
    calculatePos();
  }, []);

  useEffect(() => {
    if (Object.keys(GeneralState.errors).length > 0) {
      setErrors({ ...errors, ...GeneralState.errors });
    }
  }, [GeneralState.errors]);

  useEffect(() => {
    if (GeneralState.brothers.length > 0) {
      postStorageValues("generalState", GeneralState);
    }
  }, [GeneralState.brothers]);

  useEffect(() => {
    setImgsBro(GeneralState.fotos);
  }, [GeneralState.fotos]);

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

  const loadFormRel = () => {
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
  };

  const updateBrothers = () => {
    if (forelView) return;
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
          regular,
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
        fotoId,
        dirHer,
        tlfnHer,
        privi,
        auxiliar,
        regular,
        idRel,
        idGrupo,
      });
      setTimeout(() => {
        clearfields();
      }, 2000);
    }
  };

  const exitForm = () => {
    clearfields();
    if (Object.keys(GeneralState.temp.relations).length > 0) {
      GeneralDispatch({
        type: "PUT_TEMP_RELATIONS",
        payload: { data: {}, new: false },
      });
    }
    setOption(ScreenDispatch, "0");
  };

  const closeForm = () => {
    if (nombHer !== "" || dirHer !== "" || tlfnHer !== "") {
      setModal(true);
    } else {
      exitForm();
    }
  };
  return (
    <>
      <div id="formh" className="formh">
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
          <fieldset className="custom pt15 mt10">
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
          <fieldset id="dirh" className="custom">
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
              id="telh"
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
            <div className="mb10 ">
              <label htmlFor="auxiliar">Precursor Auxiliar</label>
              <input
                type="checkbox"
                id="auxiliar"
                name="auxiliar"
                checked={undefined !== auxiliar ? auxiliar : false}
                onChange={() => setAuxiliar(!auxiliar)}
              />
            </div>
            <div className="mb10 mt10">
              <label htmlFor="regular">Precursor Regular</label>
              <input
                type="checkbox"
                id="regular"
                name="regular"
                checked={undefined !== regular ? regular : false}
                onChange={() => setRegular(!regular)}
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
              pattern="[0-9]"
              onInput={(e) => numValid(e, setIdRel)}
            />
            <img
              className="iconoHelper"
              src={check}
              alt="check"
              onClick={() => {
                nombHer !== "" ? loadFormRel(true) : null;
              }}
            />
            <img
              className="iconoHelper"
              src={buscar}
              alt="buscar"
              onClick={() => {
                nombHer !== "" ? setModalFind(true) : null;
              }}
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
            <button
              className="fondoOcre bcOcre textNavy"
              type="button"
              onClick={() => closeForm()}
            >
              Cerrar
            </button>
          </div>
        </form>
        {forelView && nombHer !== "" ? (
          <div className="relContainer" style={{ left: `${telright}px` }}>
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
        {modal ? (
          <AvisoModal
            data={{
              title: "¡ AVISO !",
              msg: "¿ Seguro que desar salir sin grabar ?",
              bottext1: "SALIR",
              bottext2: "NO SALIR",
            }}
            setModal={setModal}
            exitForm={exitForm}
          />
        ) : null}
        {modalFind ? (
          <FindModal
            data={{
              title: "BUSCAR",
              msg: "Buscar relaciones creadas",
              bottext1: "VALIDAR",
              bottext2: "SALIR",
            }}
            setModal={setModalFind}
            listData={GeneralState.relations}
            setIdRel={setIdRel}
          />
        ) : null}
      </div>
      {imgsBro.length > 0 ? (
        <div
          className="fotoContainer"
          style={{ top: `${fotop}px`, left: `${foright}px` }}
        >
          <div className="foto">
            <FotoView images={imgsBro} fotoId={fotoId} setFotoId={setFotoId} />
          </div>
        </div>
      ) : null}
      {direct.length > 0 ? (
        <div
          className="directContainer"
          style={{ top: `${dirtop}px`, left: `${diright}px` }}
        >
          <AddresesView
            addata={direct}
            setDirect={setDirect}
            setDirHer={setDirHer}
          />
        </div>
      ) : null}
    </>
  );
};
