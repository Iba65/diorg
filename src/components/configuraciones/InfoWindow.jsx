import React, { useEffect, useState } from "react";
import { useGeneralContext } from "../../common/hooks/useGeneralContext";

export const InfoWindow = () => {
  const [listBro, setListBro] = useState([]);
  const { GeneralState } = useGeneralContext();
  useEffect(() => {
    setListBro(GeneralState.brothers);
  }, [GeneralState.brothers]);
  return (
    <div className="sectionOne">
      {listBro.length > 0 ? (
        <>
          <h3> Fichero HERMANOS </h3>
          {listBro.map((bro) => (
            <p>
              {bro.id} - {bro.nameBro} - {bro.tlfBro} - {bro.ifGroup} -{" "}
              {bro.idRelation}
            </p>
          ))}
        </>
      ) : null}
    </div>
  );
};
