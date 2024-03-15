import React, { useState } from "react";
import { info, aspaCierre } from "../../common/utils/images";
import { LineListRelHelpView } from "../configuraciones/complements/LineListRelHelpView";

export const FindModal = ({ data, setModal, listData, setIdRel }) => {
  const [selecrel, setSelecrel] = useState("");
  const { title, bottext1, bottext2 } = data;

  const getidRel = () => {
    if (selecrel !== "") {
      const id = selecrel.split("-");
      setIdRel(id[0].trim());
      setModal(false);
    }
  };
  return (
    <div className="modalContainer">
      <div className="cardModal cardFindModal">
        <div className="headerModal headerFindModal">
          <img src={info} alt="informacion" />
          <h2>{title}</h2>
          <img src={aspaCierre} alt="cerrar" onClick={() => setModal(false)} />
        </div>
        <div className="bodyFindModal">
          <div className="listMod listFindMod">
            <div className="headerListRel">
              <div className="headrelId textNavy">ID</div>
              <div className="headrelNom textNavy">NOMBRE</div>
              <div className="headrelMem textNavy">MIEMBROS</div>
            </div>
            {listData?.length > 0
              ? listData.map((rel) => (
                  <LineListRelHelpView line={rel} setSelecrel={setSelecrel} />
                ))
              : null}
          </div>
          <div className="selectRel">{selecrel}</div>
        </div>
        <div className="buttonGroup mt10 mb5">
          <button className="terciary" type="button" onClick={() => getidRel()}>
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
