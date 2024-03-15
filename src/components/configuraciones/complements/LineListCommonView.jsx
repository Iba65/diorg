import React from "react";

export const LineListCommonView = ({ line, setCallback }) => {
  const { id, field1, field2 } = line;
  return (
    <div className="lineListCommon" onClick={() => setCallback(line)}>
      <div className="linecomId center">{id}</div>
      <div className="linecomf1 left">{field1}</div>
      <div className="linecomf2 left">{field2}</div>
    </div>
  );
};
