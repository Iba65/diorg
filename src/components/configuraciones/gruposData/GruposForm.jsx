import React, { useEffect, useState, useContext } from "react";
import "./../../../css/gruposForm.css";
import ClockLoader from "react-spinners/ClockLoader";
import { ScreenContext } from "../../../common/context/screen/ScreenContext";
import { useGroups } from "./../../../common/hooks/useGroups";
import { cancelar, buscar } from "./../../../common/utils/images";
import {
  getListBroGrupRes,
  getListBroGrup,
} from "./../../../services/contextServices";
import { setOption } from "./../../../common/utils/functionsUseGeneral";
import { ListSelectData } from "../complements/ListSelectData";
import { InputArray } from "../complements/InputArray";
import { ErrorForm } from "./../../generales/ErrorForm";
import { clearState, isEmpty } from "./../../../common/utils/funtionsUtils";
import { AvisoModal } from "./../../modals/AvisoModal";

const transListData = (data) => {
  const newData = data.map((dat) => {
    return {
      id: dat.id,
      field1: dat.nameBro,
      field2: dat.priviBro,
    };
  });
  return newData;
};

export const GruposForm = () => {
  const { ScreenDispatch } = useContext(ScreenContext);
  const {
    GeneralState,
    saved,
    errors,
    validateGroupsData,
    setErrors,
    setSaved,
    updateContextGroup,
  } = useGroups();
  const [idGru, setIdGru] = useState(0);
  const [nomGru, setNomGru] = useState("");
  const [idSuperint, setIdSuperint] = useState(0);
  const [nomSuperint, setNomSuperint] = useState("");
  const [idAuxiliar, setIdAuxiliar] = useState(0);
  const [nomAuxiliar, setNomAuxiliar] = useState("");
  const [idHerg, setIdHerg] = useState(0);
  const [nameHerg, setNameHerg] = useState("");
  const [modalList, setModalList] = useState(false);
  const [modal, setModal] = useState(false);
  const [listData, setListData] = useState([]);
  const [listBrogrup, setListBrogrup] = useState([]);
  const [fieldId, setFieldId] = useState(0);
  const [listBrog, setListBrog] = useState([]);
  const [idsuptop, setIdsuptop] = useState(0);
  const [idsupright, setIdsupright] = useState(0);
  const [idauxtop, setIdauxtop] = useState(0);
  const [idauxright, setIdauxright] = useState(0);
  const [idhertop, setIdhertop] = useState(0);
  const [idherright, setIdherright] = useState(0);

  const clearfields = () => {
    clearState([setNomGru, setNomSuperint, setNomAuxiliar, setNameHerg], "");
    clearState([setModalList, setModal], false);
    clearState(
      [
        setIdGru,
        setIdAuxiliar,
        setFieldId,
        setIdsuptop,
        setIdsupright,
        setIdauxtop,
        setIdauxright,
        setIdhertop,
        setIdherright,
      ],
      0
    );
    clearState([setListData, setListBrogrup, setListBrog], []);
    setErrors({});
    setSaved(false);
  };

  useEffect(() => {
    setListData(
      transListData(
        getListBroGrupRes(GeneralState.brothers, idSuperint, idAuxiliar, idHerg)
      )
    );
    window.addEventListener("resize", calculatePos);
    calculatePos();
    if (idGru !== "" && idGru === 0) setIdGru("");
    document.getElementById("idGru").focus();
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setTimeout(() => {
        setErrors({});
      }, 5000);
    }
  }, [errors]);

  useEffect(() => {
    if (fieldId === 3 && idHerg !== 0) {
      console.log(`fielid ${fieldId} - ${nameHerg}:`, listBrog);
      setListBrog([
        ...listBrog,
        {
          id: idHerg,
          name: nameHerg,
        },
      ]);
      setIdHerg(0);
      setNameHerg("");
    }
  }, [nameHerg]);

  useEffect(() => {
    if (fieldId !== 3) {
      setListData(
        transListData(
          getListBroGrupRes(
            GeneralState.brothers,
            idSuperint,
            idAuxiliar,
            idHerg
          )
        )
      );
    }
    switch (fieldId) {
      case 1:
        if (nomGru !== "") {
          if (nomAuxiliar === "") {
            document.getElementById("idAuxiliar").focus();
          }
        } else {
          document.getElementById("nomGru").focus();
        }
        break;
      case 2:
        if (nameHerg === "") {
          document.getElementById("idHerg").focus();
        }
        break;
      default:
        break;
    }
  }, [idSuperint, idAuxiliar]);

  useEffect(() => {
    if (fieldId !== 3) {
      setListData(
        transListData(
          getListBroGrupRes(
            GeneralState.brothers,
            idSuperint,
            idAuxiliar,
            idHerg
          )
        )
      );
    }
  }, [fieldId]);

  useEffect(() => {
    if (parseInt(idHerg) !== 0) {
      setListBrogrup([...listBrogrup, idHerg]);
    }
  }, [idHerg]);

  const calculatePos = () => {
    let container = document.getElementById("idSuperint");
    setIdsuptop(container.getBoundingClientRect().top + 5);
    setIdsupright(container.getBoundingClientRect().right + 10);
    container = document.getElementById("idAuxiliar");
    setIdauxtop(container.getBoundingClientRect().top + 5);
    setIdauxright(container.getBoundingClientRect().right + 10);
    container = document.getElementById("idHerg");
    setIdhertop(container.getBoundingClientRect().top + 5);
    setIdherright(container.getBoundingClientRect().right + 10);
  };

  const ctrlIdGrup = (id) => {
    if (id === "" || parseInt(id) === 0) {
      document.getElementById("idGru").focus();
    }
  };

  const updateGroups = () => {
    if (
      !validateGroupsData({
        idGru,
        idSuperint,
        idAuxiliar,
        listBrog,
      })
    ) {
      updateContextGroup({
        idGru,
        nomGru,
        idSuperint,
        nomSuperint,
        idAuxiliar,
        nomAuxiliar,
        listBrog,
      });
    }
  };

  const exitForm = () => {
    clearfields();
    setOption(ScreenDispatch, "0");
  };

  const closeForm = () => {
    if (
      !isEmpty(idGru) ||
      !isEmpty(idSuperint) ||
      !isEmpty(idAuxiliar) ||
      !isEmpty(listBrog)
    ) {
      setModal(true);
    } else {
      exitForm();
    }
  };

  return (
    <>
      <div id="formh" className="formh">
        <form>
          <div className="headerImg">
            <h2 className="form-title">
              <span>Grupos de Servicio</span>
            </h2>
            <div className="fieldsIdGru">
              <fieldset className="fieldid">
                <label htmlFor="idGru" className="headLabel">
                  ID Grupo
                </label>
                <input
                  className="fieldId"
                  id="idGru"
                  name="idGru"
                  type="text"
                  value={idGru}
                  size="1"
                  onInput={(e) => setIdGru(e.target.value)}
                  onBlur={() => ctrlIdGrup(idGru)}
                />
              </fieldset>
              <fieldset className="fieldnomid">
                <label htmlFor="nomGru" className="headLabel">
                  Nombre Grupo
                </label>
                <input
                  className="fieldNomId"
                  id="nomGru"
                  name="nomGru"
                  type="text"
                  value={nomGru}
                  size="115"
                  onInput={(e) => setNomGru(e.target.value)}
                />
              </fieldset>
            </div>
          </div>
          <fieldset className="sg1">
            <label htmlFor="idSuperint">Superintendente</label>
            <input
              id="idSuperint"
              name="idSuperint"
              type="text"
              value={idSuperint}
              size="1"
              onInput={(e) => setIdSuperint(e.target.value)}
              onFocus={() => {
                setModalList(true);
                setFieldId(1);
              }}
            />
            <label htmlFor="nomSuperint"> </label>
            <input
              id="nomSuperint"
              name="nomSuperint"
              type="text"
              value={nomSuperint}
              size="30"
              readOnly
            />
          </fieldset>
          <fieldset className="sg2">
            <label htmlFor="idAuxiliar">Auxiliar</label>
            <input
              id="idAuxiliar"
              name="idAuxiliar"
              type="text"
              value={idAuxiliar}
              size="1"
              onInput={(e) => setIdAuxiliar(e.target.value)}
              onFocus={() => {
                setModalList(true);
                setFieldId(2);
              }}
            />
            <label htmlFor="nomAuxiliar"> </label>
            <input
              id="nomAuxiliar"
              name="nomAuxiliar"
              type="text"
              value={nomAuxiliar}
              size="30"
              readOnly
            />
          </fieldset>
          <div className="asisgrupData">
            <div className="fg1">
              <fieldset className="custom">
                <label htmlFor="idHerg" className="headLabel">
                  ID Hermano
                </label>
                <input
                  className="fieldId"
                  id="idHerg"
                  name="idHerg"
                  type="text"
                  value={idHerg}
                  size="1"
                  onInput={(e) => setIdHerg(e.target.value)}
                  onFocus={() => {
                    setListData(
                      transListData(
                        getListBroGrup(GeneralState.brothers, listBrogrup)
                      )
                    );
                    setModalList(true);
                    setFieldId(3);
                  }}
                />
              </fieldset>
              <fieldset className="custom">
                <label htmlFor="nameHerg">Nombre Hermano</label>
                <input
                  id="nameHerg"
                  name="nameHerg"
                  type="text"
                  value={nameHerg}
                  size="25"
                  readOnly
                  onInput={(e) => setNameHerg(e.target.value)}
                />
                <img
                  className={
                    nameHerg !== ""
                      ? "borrarEntrada"
                      : "borrarEntrada borenHidden"
                  }
                  src={cancelar}
                  alt="cancelar"
                  onClick={() => setNameHerg("")}
                />
              </fieldset>
            </div>
            <InputArray
              setListBrogrup={setListBrogrup}
              listBrogrup={listBrogrup}
              cancelar={cancelar}
              listBrog={listBrog}
              setListBrog={setListBrog}
            />
          </div>
          <div className="fielderr">
            {errors.idGru ? <ErrorForm error={errors.idGru} /> : null}
            {errors.idSuperint ? <ErrorForm error={errors.idSuperint} /> : null}
            {errors.idAuxiliar ? <ErrorForm error={errors.idAuxiliar} /> : null}
          </div>
          <div className="buttonGroup ">
            <button
              className="fondoCielo bcCielo textNavy"
              type="button"
              onClick={() => updateGroups()}
            >
              {saved ? (
                <div className="saved">
                  Guardando
                  <ClockLoader
                    color="navy"
                    cssOverride={{
                      margin: "0px",
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
              className="fondoCielo bcCielo textNavy"
              type="button"
              onClick={() => closeForm()}
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
      {modalList ? (
        <div>
          <ListSelectData
            title="Seleccione a un hermano/a"
            data={listData}
            setSelectId={
              fieldId === 1
                ? setIdSuperint
                : fieldId === 2
                ? setIdAuxiliar
                : setIdHerg
            }
            setSelectNam={
              fieldId === 1
                ? setNomSuperint
                : fieldId === 2
                ? setNomAuxiliar
                : setNameHerg
            }
            setModalList={setModalList}
            idsuptop={
              fieldId === 1 ? idsuptop : fieldId === 2 ? idauxtop : idhertop
            }
            idsupright={
              fieldId === 1
                ? idsupright
                : fieldId === 2
                ? idauxright
                : idherright
            }
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
    </>
  );
};
