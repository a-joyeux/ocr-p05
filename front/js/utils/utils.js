/*

- Convert formData type to Object type

*/

function formDataToObject(formElem) {
  let formObject = {};
  formElem.forEach((value, key) => {
    formObject[key] = value;
  });
  return formObject;
}

/*

- Retrieve cart from local storage

*/
export default function getCart() {
  let cart = [];
  if (localStorage.getItem("Cart")) {
    cart = JSON.parse(localStorage.getItem("Cart"));
  }
  return cart;
}

export { getCart, formDataToObject };
