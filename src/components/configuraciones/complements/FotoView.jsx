import React, { useEffect, useState } from "react";
import "./../../../css/fotoView.css";
import { atras, alante } from "./../../../common/utils/images";

export const FotoView = ({ images, fotoId, setFotoId }) => {
  const [indef, setIndef] = useState(fotoId);
  useEffect(() => {
    setFotoId(indef);
  }, [indef]);

  useEffect(() => {
    setIndef(fotoId);
  }, [fotoId]);
  return (
    <div className="fotoCard">
      <div className="fotoImg">
        <img
          src={`/src/assets/Fotos/${images[indef].nameImg}`}
          alt={images[indef].nameImg}
        />
      </div>
      <div className="fotoActions">
        <div
          className="action"
          onClick={() =>
            setIndef((a) => {
              return a - 1 < 0 ? 0 : a - 1;
            })
          }
        >
          <img src={atras} alt="atras" />
        </div>
        <div
          className="action"
          onClick={() =>
            setIndef((a) => {
              return a + 1 > images.length - 1 ? images.length - 1 : a + 1;
            })
          }
        >
          <img src={alante} alt="adelante" />
        </div>
      </div>
    </div>
  );
};
