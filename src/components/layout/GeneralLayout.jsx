import React from "react";
import "./layoutStyles.css";

export const GeneralLayout = ({ children }) => {
  return (
    <>
      <div className="appContainer">
        <div className="lateralMenu">{children[0]}</div>
        <div className="bodyApp">{children[1]}</div>
      </div>
    </>
  );
};
