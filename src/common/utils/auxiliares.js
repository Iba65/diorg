export const initGeneralState = {
  counterIds: {
    relations: 0,
    brothers: 0,
    groups: 0,
  },
  relations: [],
  brothers: [],
  groups: [],
  addreses: [],
  fotos: [
    {
      id: 1,
      idBro: 0,
      nameImg: "NsNc.png",
    },
    {
      id: 2,
      idBro: 0,
      nameImg: "hnaImg.png",
    },
    {
      id: 3,
      idBro: 0,
      nameImg: "hnoImg.png",
    },
  ],
  temp: {
    relations: {},
    relnew: false,
  },
  errors: {},
};
export const initScreenState = {
  sectionActive: "",
  screenDataActive: true,
  screenBroActive: false,
  screenRelActive: false,
  screenGruActive: false,
};

export const privileg = [
  {
    id: 1,
    priv: "Publicador",
  },
  {
    id: 2,
    priv: "Siervo",
  },
  {
    id: 3,
    priv: "Anciano",
  },
];

export const tipeRelation = [
  {
    id: 1,
    rel: "Familiar",
  },
  {
    id: 2,
    rel: "Ministerial",
  },
  {
    id: 3,
    rel: "Otra",
  },
];
