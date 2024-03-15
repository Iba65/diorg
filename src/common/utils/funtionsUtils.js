export const isEmpty = (field) => {
  let resEmpty = false;
  if (typeof field === "array" || typeof field === "object") {
    resEmpty = field.length <= 0;
  } else {
    resEmpty =
      field === "" || field === null || field === 0 || field.length <= 0;
  }
  return resEmpty;
};
export const clearState = (data, value) => {
  data.map((func) => {
    func(value);
  });
};
