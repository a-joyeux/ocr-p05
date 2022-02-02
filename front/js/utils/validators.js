const validators = [
  {
    field: "email",
    regexp: /.+\@.+\..+/,
    errorMsg: "Format d'email non valide (@ ou domaine manquant)",
  },
  {
    field: "firstName",
    regexp: /^[a-z\s]+$/i,
    errorMsg: "Chiffres ou caractères spéciaux interdits",
  },
  {
    field: "lastName",
    regexp: /^[a-z\s]+$/i,
    errorMsg: "Chiffres ou caractères spéciaux interdits",
  },
  {
    field: "address",
    regexp: /^[a-z\s]+$/i,
    errorMsg: "Chiffres ou caractères spéciaux interdits",
  },
  {
    field: "city",
    regexp: /^[a-z\s]+$/i,
    errorMsg: "Chiffres ou caractères spéciaux interdits",
  },
];

function getValidatorByField(field) {
  return validators.find((elem) => elem.field == field);
}

export { getValidatorByField };
