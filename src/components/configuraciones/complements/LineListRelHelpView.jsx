import React from "react";

export const LineListRelHelpView = ({ line, setSelecrel }) => {
  const { idr, tipo, members } = line;
  return (
    <div
      className="lineListRel"
      onClick={() => setSelecrel(` ${idr} - ${tipo}`)}
    >
      <div className="linerelId center">{idr}</div>
      <div className="linerelNom left">{tipo}</div>
      <div className="linerelMem center">{`${members.length} miembros`}</div>
    </div>
  );
};
