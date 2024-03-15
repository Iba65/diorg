import { isEmpty } from "./funtionsUtils";

export const validaFormRel = (data, GeneralDispatch) => {
  let errData = false;
  let errors = {};
  const { idRelat, nombRel, nombro, idMem, nomMem, tipRel } = data;
  if (isEmpty(idRelat)) {
    errData = true;
    errors.idRelat = {
      tipo: "error",
      state: true,
      msg: "El indice de relación no puede ser 0.",
    };
  }
  if (isEmpty(nombRel)) {
    errData = true;
    errors.nombRel = {
      tipo: "error",
      state: true,
      msg: "Indique un nombre descriptivo para la relación.",
    };
  }
  if (isEmpty(idMem)) {
    errData = true;
    errors.idMem = {
      tipo: "error",
      state: true,
      msg: "El indice del miembro del grupo no puede ser 0.",
    };
  }
  if (isEmpty(nomMem)) {
    errData = true;
    errors.nomMem = {
      tipo: "error",
      state: true,
      msg: "Indique un nombre para el miembro.",
    };
  } else {
    if (nomMem.toUpperCase() !== nombro.toUpperCase()) {
      errData = true;
      errors.nomMem = {
        tipo: "error",
        state: true,
        msg: "El nombre del hermano no correspode con el del fichero de Hermanos.",
      };
    }
  }
  if (isEmpty(tipRel)) {
    errData = true;
    errors.tipRel = {
      tipo: "error",
      state: true,
      msg: "Debe escoger una opción valida.",
    };
  }
  GeneralDispatch({
    type: "ADD_ERROR",
    payload: errors,
  });
  return errData;
};
export const validaFormBro = (data, GeneralDispatch) => {
  let errData = false;
  let errors = {};
  const { nombHer, dirHer, tlfnHer, privi } = data;
  if (isEmpty(nombHer)) {
    errData = true;
    errors.nombHer = {
      tipo: "error",
      state: true,
      msg: "El nombre del hermano/a no puede estar vacio.",
    };
  }
  if (isEmpty(dirHer)) {
    errors.dirHer = {
      tipo: "alert",
      state: true,
      msg: "Si no introduce la dirección ahora, acuerdese de hacerlo mas tarde.",
    };
  }
  if (isEmpty(tlfnHer)) {
    errData = true;
    errors.tlfnHer = {
      tipo: "error",
      state: true,
      msg: "Debe introducir un numero de teléfono para el hermano/a.",
    };
  }
  if (isEmpty(privi)) {
    errData = true;
    errors.privi = {
      tipo: "error",
      state: true,
      msg: "Debe escoger una opción valida.",
    };
  }
  GeneralDispatch({
    type: "ADD_ERROR",
    payload: errors,
  });
  return errData;
};

const numberCounts = (value) => {
  let c = 0;
  for (let l = 0; l < value.length; l++) {
    if (!isNaN(parseInt(value.charAt(l)))) {
      c++;
    }
  }
  return c;
};
export const tlfValid = (e, setTlfnHer) => {
  if (e.target.value.length <= 16) {
    let total = 9;
    if (e.target.value.includes("+")) {
      total = 11;
    }
    if (/[0-9\ \(\)\-\+]$/.test(e.target.value) || e.target.value === "") {
      if (numberCounts(e.target.value) < total) {
        setTlfnHer(e.target.value);
      } else {
        if (
          !isNaN(parseInt(e.target.value.charAt(e.target.value.length - 1)))
        ) {
          if (numberCounts(e.target.value) === total) {
            setTlfnHer(e.target.value);
          }
        }
      }
    }
  }
};

export const numValid = (e, callback) => {
  if (/[0-9+]$/.test(e.target.value) || e.target.value === "") {
    callback(e.target.value);
  }
};

export const isAddress = (dir, GeneralState) => {
  if (undefined !== GeneralState.addreses.find((add) => add === dir)) {
    return true;
  } else {
    return false;
  }
};

export const setOption = (ScreenDispatch, opc) => {
  ScreenDispatch({
    type: "CLOSE_ALL_OPTIONS",
    payload: opc === "0",
  });
  ScreenDispatch({
    type: "OPEN_FORM_BROTHERS",
    payload: opc === "1",
  });
  ScreenDispatch({
    type: "OPEN_FORM_RELATIONS",
    payload: opc === "2",
  });
  ScreenDispatch({
    type: "OPEN_FORM_GROUPS",
    payload: opc === "3",
  });
};
