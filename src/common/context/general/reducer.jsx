export default function reducer(state, action) {
  switch (action.type) {
    case "INITAL_LOADING":
      return action.payload;
    case "ADD_ADDRESS":
      return { ...state, addreses: [...state.addreses, action.payload] };
    case "ADD_BROTHER":
      return { ...state, brothers: [...state.brothers, action.payload] };
    case "PLUS_COUNTER_BRO":
      return {
        ...state,
        counterIds: { ...state.counterIds, brothers: action.payload },
      };
    case "PLUS_COUNTER_REL":
      return {
        ...state,
        counterIds: {
          ...state.counterIds,
          relations: state.counterIds.relations + 1,
        },
      };
    case "PLUS_COUNTER_GRU":
      return {
        ...state,
        counterIds: {
          ...state.counterIds,
          groups: state.counterIds.relations + 1,
        },
      };
    case "CREATE_RELATION":
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
    case "PUT_TEMP_RELATIONS":
      return {
        ...state,
        temp: {
          ...state.temp,
          relations: action.payload.data,
          relnew: action.payload.new,
        },
      };
    case "UPDATE_FOTOS":
      const newfotos = state.fotos.map((fot) => {
        if (fot.id === action.payload.id) {
          return {
            id: fot.id,
            idBro: action.payload.idBro,
            nameImg: fot.nameImg,
          };
        } else {
          return fot;
        }
      });
      return {
        ...state,
        fotos: newfotos,
      };
    case "ADD_GROUP":
      console.log(action);
      return {
        ...state,
        groups: [...state.groups, action.payload],
      };

    default:
      return state;
  }
}
