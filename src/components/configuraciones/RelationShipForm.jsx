import React, { useRef, useState, useEffect } from "react";
import "./../../css/generalForm.css";
import "./../../css/relationShipForm.css";
import { cancelar } from "./../../common/utils/images";
import { ErrorForm } from "./../generales/ErrorForm";
import { tipeRelation } from "../../common/utils/auxiliares";
import { validaFormRel } from "./../../common/utils/functionsUseGeneral";
import PropTypes from "prop-types";

export const RelationShipForm = ({
  idHer,
  isRelat,
  isRelbro,
  selRelat,
  GeneralState,
  setIdRel,
  setForelView,
  isRelationId,
  GeneralDispatch,
  updateContextRel,
}) => {
  const [idRelat, setIdRelat] = useState(selRelat.idr !== 0 ? selRelat.idr : 0);
  const [nombRel, setNombRel] = useState("");
  const [idMem, setIdMem] = useState(0);
  const [nomMem, setNomMem] = useState(
    selRelat.nomher !== "" ? selRelat.nomher : ""
  );
  const [tipRel, setTipRel] = useState(null);
  const [errors, setErrors] = useState({});
  const refnorel = useRef();
  const reftiprel = useRef();

  useEffect(() => {
    if (Object.keys(GeneralState.errors).length > 0) {
      setErrors({ ...errors, ...GeneralState.errors });
    }
  }, [GeneralState.errors]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setTimeout(() => {
        setErrors({});
        GeneralDispatch({
          type: "ADD_ERROR",
          payload: {},
        });
      }, 3000);
    }
  }, [errors]);

  useEffect(() => {
    if (Object.keys(selRelat).length > 0) {
      console.log("selRelat:", selRelat);
      const resp = isRelationId(selRelat.idr);
      if (Object.keys(resp).length > 0) {
        setNombRel(resp.tipo);
        setIdMem(idHer);
        reftiprel.current.focus();
      } else {
        setIdMem(1);
        refnorel.current.focus();
      }
    }
  }, [selRelat]);

  const updateRelations = () => {
    const paydata = {
      idRelat,
      nombRel,
      nombro: selRelat.nomher,
      idMem,
      nomMem,
      tipRel,
    };
    if (!validaFormRel(paydata, GeneralDispatch)) {
      updateContextRel(paydata, isRelat);
      setIdRel(idRelat);
      clearFields();
    }
  };
  const closeForel = () => {
    clearFields();
    setIdRel(0);
  };
  const clearFields = () => {
    setIdRelat(0);
    setIdMem(0);
    setNomMem("");
    setNomMem("");
    setTipRel("");
    setForelView(false);
  };
  return (
    <>
      <div className="formr fondoCielo bcNavy">
        <div className="formTitle fondoNavy textCeleste nopadt">
          <h2>Formulario Relación</h2>
        </div>
        <form>
          <fieldset className="custom">
            <label>Id Relacion</label>
            <input
              className="fieldId"
              name="idRelat"
              type="text"
              value={idRelat}
              size="1"
              readOnly
              onInput={(e) => setIdRelat(e.target.value)}
            />
          </fieldset>
          <div className="fielderr">
            {errors.idRelat ? <ErrorForm error={errors.idRelat} /> : null}
          </div>
          <fieldset className="custom">
            <label>Nombre Relación</label>
            <input
              ref={refnorel}
              name="nombRel"
              type="text"
              value={nombRel}
              size="20"
              readOnly={isRelat}
              onInput={(e) => setNombRel(e.target.value)}
            />
            {!isRelat ? (
              <img
                className={
                  nombRel !== "" ? "borrarEntrada" : "borrarEntrada borenHidden"
                }
                src={cancelar}
                alt="cancelar"
                onClick={() => setNombRel("")}
              />
            ) : null}
          </fieldset>
          <div className="fielderr">
            {errors.nombRel ? <ErrorForm error={errors.nombRel} /> : null}
          </div>
          <fieldset className="custom">
            <label>Id Miembro</label>
            <input
              className="fieldId"
              name="idMem"
              type="text"
              value={idMem}
              size="1"
              readOnly
              onInput={(e) => setIdMem(e.target.value)}
            />
            {!isRelat ? (
              <img
                className={
                  idMem !== 0 ? "borrarEntrada" : "borrarEntrada borenHidden"
                }
                src={cancelar}
                alt="cancelar"
                onClick={() => setIdMem("")}
              />
            ) : null}
          </fieldset>
          <div className="fielderr">
            {errors.idMem ? <ErrorForm error={errors.idMem} /> : null}
          </div>
          <fieldset className="custom">
            <label>Nombre</label>
            <input
              name="nomMem"
              type="text"
              value={nomMem}
              size="25"
              readOnly={isRelbro}
              onInput={(e) => setNomMem(e.target.value)}
            />
            <img
              className={
                nomMem !== "" ? "borrarEntrada" : "borrarEntrada borenHidden"
              }
              src={cancelar}
              alt="cancelar"
              onClick={() => setNomMem("")}
            />
          </fieldset>
          <div className="fielderr">
            {errors.nomMem ? <ErrorForm error={errors.nomMem} /> : null}
          </div>
          <fieldset className="custom">
            <label>Tipo Relación</label>
            <select
              ref={reftiprel}
              name="tipeRelation"
              value={tipRel !== null ? tipRel : 0}
              readOnly={isRelbro}
              onChange={(e) => setTipRel(e.target.value)}
            >
              <option value="">Seleccione...</option>
              {tipeRelation.length > 0
                ? tipeRelation.map((tipre) => (
                    <option value={tipre.rel} key={tipre.id}>
                      {tipre.rel}
                    </option>
                  ))
                : null}
            </select>
          </fieldset>
          <div className="fielderr">
            {errors.tipRel ? <ErrorForm error={errors.tipRel} /> : null}
          </div>
          <div className="buttonGroup mt10 mb5">
            <button
              className="fondoOcre bcOcre textNavy"
              type="button"
              onClick={() => updateRelations()}
            >
              Validar
            </button>
            <button
              className="fondoOcre bcOcre textNavy"
              type="button"
              onClick={() => closeForel()}
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

RelationShipForm.propTypes = {
  idHer: PropTypes.number.isRequired,
  isRelat: PropTypes.bool.isRequired,
  isRelbro: PropTypes.bool.isRequired,
  selRelat: PropTypes.object.isRequired,
  GeneralState: PropTypes.object.isRequired,
  setIdRel: PropTypes.func.isRequired,
  setForelView: PropTypes.func.isRequired,
  isRelationId: PropTypes.func.isRequired,
  GeneralDispatch: PropTypes.func.isRequired,
  updateContextRel: PropTypes.func.isRequired,
};
