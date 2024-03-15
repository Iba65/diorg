import React from "react";

export const LineListBroView = ({ line }) => {
  const { id, nameBro, tlfBro, idGroup, idRelation } = line;
  return (
    <div className="lineListBro">
      <div className="linebroId textWhite center">{id}</div>
      <div className="linebroNombre textWhite">{nameBro}</div>
      <div className="linebroTlf textWhite">{tlfBro}</div>
      <div className="linebroGrupo textWhite center">
        {idGroup > 0 ? `Num. ${idGroup}` : ""}
      </div>
      <div className="linebroRelacion textWhite center">{idRelation}</div>
    </div>
  );
};
