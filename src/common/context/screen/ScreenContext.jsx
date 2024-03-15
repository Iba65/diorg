import React, { useReducer } from "react";
import reducer from "./reducer.jsx";
import { initScreenState } from "./../../utils/auxiliares.js";
import PropTypes from "prop-types";

export const ScreenContext = React.createContext();

export function ScreenProvider({ children }) {
  const [ScreenState, ScreenDispatch] = useReducer(reducer, initScreenState);
  const value = React.useMemo(
    () => ({ ScreenState, ScreenDispatch }),
    [ScreenState]
  );
  return (
    <ScreenContext.Provider value={value}>{children}</ScreenContext.Provider>
  );
}

ScreenProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
