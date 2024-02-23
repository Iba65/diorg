import React, { useEffect } from "react";
import { useGeneralContext } from "../../common/hooks/useGeneralContext";
import { useState } from "react";

export const ListHermanosForm = () => {
  const { GeneralState } = useGeneralContext();
  const [listBro, setListBro] = useState([]);

  useEffect(() => {
    setListBro(GeneralState.brothers);
  }, [GeneralState.brothers]);
  return (
    <div className="listformh">
      <h1>Listado de hermanos</h1>
      {listBro.length > 0 ? <p>aqui el listado</p> : null}
    </div>
  );
};
