import React, { useState } from "react";

export const InputArray = ({
  setListBrogrup,
  listBrogrup,
  cancelar,
  listBrog,
  setListBrog,
}) => {
  const updateList = (index) => {
    console.log(index);
    console.log(listBrog);
    console.log(listBrogrup);
    setListBrog(listBrog.filter((dat) => dat.id !== index));
    setListBrogrup(listBrogrup.filter((dat) => dat !== index));
  };

  return (
    <div className="asisgrupDataList">
      {listBrog.length > 0
        ? listBrog.map((inpdat, index) => (
            <div className="fg2" key={index}>
              <fieldset className="custom">
                <label htmlFor={`idHerg${index}`} className="headLabel">
                  ID Hermano/a
                </label>
                <input
                  className="fieldId"
                  id={`idHerg${index}`}
                  name="idHerg"
                  type="text"
                  value={inpdat.id}
                  size="1"
                  readOnly
                />
              </fieldset>
              <fieldset className="custom">
                <label htmlFor="nameHerg">Nombre Hermano/a</label>
                <input
                  id={`nameHerg${index}`}
                  name="nameHerg"
                  type="text"
                  value={inpdat.name}
                  size="25"
                  readOnly
                />
                <img
                  className={
                    inpdat.name !== ""
                      ? "borrarEntrada"
                      : "borrarEntrada borenHidden"
                  }
                  src={cancelar}
                  alt="cancelar"
                  onClick={() => updateList(inpdat.id)}
                />
              </fieldset>
            </div>
          ))
        : null}
    </div>
  );
};
