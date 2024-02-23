export const initGeneralState = {
  counterIds: {
    relations: 0,
    brothers: 0,
    groups: 0,
  },
  relations: [],
  brothers: [],
  groups: [
    {
      idGrup: 0,
      nomGrup: "",
      memGrup: [
        {
          idBro: 0,
          nomBro: "",
          tipo: "",
        },
      ],
    },
  ],
  addreses: [],
  errors: {},
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
  {
    id: 4,
    priv: "Precursor",
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
