import React from "react";
import { alerta, aspaCierre } from "./../../common/utils/images";

export const AvisoModal = ({ data, setModal, exitForm }) => {
  const { title, msg, bottext1, bottext2 } = data;
  return (
    <div className="modalContainer">
      <div className="cardModal">
        <div className="headerModal">
          <img src={alerta} alt="alerta" />
          <h2>{title}</h2>
          <img src={aspaCierre} alt="cerrar" onClick={() => setModal(false)} />
        </div>
        <div className="bodyModal">
          <p>{msg}</p>
        </div>
        <div className="buttonGroup mt10 mb5">
          <button className="terciary" type="button" onClick={() => exitForm()}>
            {bottext1}
          </button>
          <button
            className="terciary"
            type="button"
            onClick={() => setModal(false)}
          >
            {bottext2}
          </button>
        </div>
      </div>
    </div>
  );
};
