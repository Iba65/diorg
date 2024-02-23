//import { useState, useEffect } from "react";

export const useLocalStorage = () => {
  const getStorageValues = (key, defaultValue = {}) => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(key);
      const initial = saved !== null ? JSON.parse(saved) : defaultValue;
      return initial;
    }
  };

  const postStorageValues = (key, values) => {
    console.log("value -->", values);
    localStorage.setItem(key, JSON.stringify(values));
  };

  return { getStorageValues, postStorageValues };
};
