import React from "react";

export const AddresesView = ({ addata, setDirect, setDirHer }) => {
  const handleClick = (add) => {
    setDirHer(add);
    setDirect([]);
  };
  return (
    <>
      {addata.length > 0
        ? addata.map((add) => (
            <div
              key={add}
              className="direlem textNavy"
              onClick={() => handleClick(add)}
            >{`· ${add}`}</div>
          ))
        : null}
    </>
  );
};
