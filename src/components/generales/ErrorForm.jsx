import React from "react";

export const ErrorForm = ({ error }) => {
  return <div className={`errorform ${error.tipo}`}>{error.msg}</div>;
};
