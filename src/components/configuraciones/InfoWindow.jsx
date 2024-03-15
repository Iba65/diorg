import React, { useEffect, useState } from "react";
import { useGeneralContext } from "../../common/hooks/useGeneralContext";
import { LineListBroView } from "./complements/LineListBroView";

export const InfoWindow = () => {
  const [listBro, setListBro] = useState([]);
  const { GeneralState } = useGeneralContext();
  useEffect(() => {
    setListBro(GeneralState.brothers);
  }, [GeneralState.brothers]);
  return (
    <div className="sectionOne">
      {listBro.length > 0 ? (
        <div className="listBroContainer">
          <h3> Fichero HERMANOS </h3>
          <div className="headerListbro">
            <div className="listbroId textNavy">ID</div>
            <div className="listbroNombre textNavy">NOMBRE</div>
            <div className="listbroTlf textNavy">Tlf</div>
            <div className="listbroGrupo textNavy">GRUPO</div>
            <div className="listbroRelacion textNavy">REL</div>
          </div>
          <div className="listBroBody">
            {listBro.map((bro) => (
              <LineListBroView key={bro.id} line={bro} />
            ))}
          </div>
          <div className="lincierre"></div>
        </div>
      ) : null}
    </div>
  );
};
