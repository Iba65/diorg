import React, { useState, useEffect } from "react";
import { aspaCierre } from "./../../../common/utils/images";
import { LineListCommonView } from "./LineListCommonView";
//import { uptriangle, downtriangle } from "./../../../common/utils/images";

export const ListSelectData = ({
  title,
  data,
  setSelectId,
  setSelectNam,
  setModalList,
  idsuptop,
  idsupright,
}) => {
  const [selected, setSelected] = useState({});

  useEffect(() => {
    console.log("selected:", selected);
    if (Object.keys(selected).length > 0) {
      setSelectId(selected.id);
      setSelectNam(selected.field1);
      setModalList(false);
    }
  }, [selected]);

  return (
    <div
      className="listselContainer"
      style={{ top: `${idsuptop}px`, left: `${idsupright}px` }}
    >
      <div className="listselBody">
        <div className="titlelistsel">{title}</div>
        <div className="closeModal" onClick={() => setModalList(false)}>
          <img src={aspaCierre} alt="Cerrar Modal" />
        </div>
        <div className="listselines">
          {data.length > 0
            ? data.map((line) => (
                <div key={line.id}>
                  <LineListCommonView line={line} setCallback={setSelected} />
                </div>
              ))
            : null}
        </div>
      </div>
      {/*
      <div className="listselScroll">
        <img className="up" src={uptriangle} alt="scroll up" />
        <img className="down" src={downtriangle} alt="scroll down" />
      </div>
       */}
    </div>
  );
};
