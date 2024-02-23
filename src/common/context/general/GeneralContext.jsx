import React, { useReducer } from "react";
import reducer from "./reducer.jsx";
import { initGeneralState } from "./../../utils/auxiliares.js";
import PropTypes from "prop-types";

export const GeneralContext = React.createContext();

export function GeneralProvider({ children }) {
  const [GeneralState, GeneralDispatch] = useReducer(reducer, initGeneralState);
  const value = React.useMemo(
    () => ({ GeneralState, GeneralDispatch }),
    [GeneralState]
  );
  return (
    <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
  );
}

GeneralProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
