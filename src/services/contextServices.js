export const getListBroGrupRes = (data, id1, id2, id3) => {
  const resp = data.filter(
    (bro) =>
      (bro.priviBro === "Anciano" || bro.priviBro === "Siervo") &&
      bro.id !== id1 &&
      bro.id !== id2 &&
      bro.id !== id3
  );
  return resp;
};

const isbro = (list, id) => {
  const is = list.find((ele) => ele === id);
  if (undefined !== is) {
    return true;
  } else {
    return false;
  }
};
export const getListBroGrup = (data, list) => {
  const resp = data.filter(
    (bro) =>
      bro.priviBro !== "Anciano" &&
      bro.priviBro !== "Siervo" &&
      !isbro(list, bro.id)
  );
  return resp;
};
export const isGroup = (list, id) => {
  const is = list.find((gru) => gru.idGrup === id);
  if (undefined !== is) {
    return true;
  } else {
    return false;
  }
};
