// src/app/core/models/models.ts
var STATUT_LABELS = {
  en_attente: "En attente",
  en_preparation: "En pr\xE9paration",
  expediee: "Exp\xE9di\xE9e",
  livree: "Livr\xE9e",
  annulee: "Annul\xE9e"
};
var STATUT_NEXT = {
  en_attente: "en_preparation",
  en_preparation: "expediee",
  expediee: "livree"
};
var CATEGORY_LABELS = {
  miels: "Miels",
  savons: "Savons",
  confiseries: "Confiseries",
  cosmetiques: "Cosm\xE9tiques",
  bougies: "Bougies",
  pollen: "Pollen",
  propolis: "Propolis",
  coffrets: "Coffrets"
};

export {
  STATUT_LABELS,
  STATUT_NEXT,
  CATEGORY_LABELS
};
//# sourceMappingURL=chunk-EFSXKDVI.js.map
