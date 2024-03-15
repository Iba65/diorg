export default function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_SCREEN_ACTIVE":
      return {
        ...state,
        sectionActive: action.payload,
      };
    case "CLOSE_ALL_OPTIONS":
      return {
        ...state,
        screenDataActive: action.payload,
      };
    case "OPEN_FORM_BROTHERS":
      return {
        ...state,
        screenBroActive: action.payload,
      };
    case "OPEN_FORM_RELATIONS":
      return {
        ...state,
        screenRelActive: action.payload,
      };
    case "OPEN_FORM_GROUPS":
      return {
        ...state,
        screenGruActive: action.payload,
      };
    default:
      return state;
  }
}
