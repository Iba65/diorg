export const isEmpty = (field) => {
  let resEmpty = false;
  resEmpty = field === "" || field === null || field === 0 || field.length <= 0;
  return resEmpty;
};

export const clearState = (data, value) => {
  data.map((func) => {
    func(value);
  });
};
