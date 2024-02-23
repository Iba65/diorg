export default function reducer(state, action) {
  switch (action.type) {
    case "INITAL_LOADING":
      return { state: action.payload };
    case "ADD_ADDRESS":
      return { ...state, addreses: [...state.addreses, action.payload] };
    case "ADD_BROTHER":
      return { ...state, brothers: [...state.brothers, action.payload] };
    case "PLUS_COUNTER_BRO":
      console.log(action.payload);
      return {
        ...state,
        counterIds: { ...state.counterIds, brothers: action.payload },
      };
    case "PLUS_COUNTER_REL":
      return {
        ...state,
        counterIds: {
          ...state.counterIds,
          relations: state.relations + 1,
        },
      };
    case "CREATE_RELATION":
      console.log("CREATE_RELATION -->", action.payload);
      return {
        ...state,
        relations: [...state.relations, action.payload],
      };
    case "ADD_MEMBER":
      const newRelations = state.relations.map((rel) => {
        if (rel.idr === action.payload.id) {
          const newObj = {
            idr: rel.idr,
            tipo: rel.tipo,
            members: [
              ...rel.members,
              {
                idm: action.payload.idm,
                nom: action.payload.nom,
                pos: action.payload.pos,
              },
            ],
          };
          return newObj;
        } else {
          return rel;
        }
      });
      return {
        ...state,
        relations: newRelations,
      };
    case "CHANGE_NAME_BRO":
      const newRelat = state.relations.map((rel) => {
        if (rel.idr === action.payload.id) {
          const newDatMem = rel.mambers.map((mem) => {
            if ((mem.idm = action.payload.idm)) {
              return {
                idm: mem.idm,
                nom: action.payload.nom,
                pos: mem.pos,
              };
            } else {
              return mem;
            }
          });
          const newObj = {
            idr: rel.idr,
            tipo: rel.tipo,
            members: newDatMem,
          };
          return newObj;
        } else {
          return rel;
        }
      });
      return {
        ...state,
        relations: newRelat,
      };
    case "DEL_RELATION":
      return {
        ...state,
        yearService: action.payload,
      };
    case "ADD_ERROR":
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
}
