import { getOneProduct, getProductHtmlElement } from "./controllers/Product.js";

function fillOneProduct() {
  const id = new URLSearchParams(window.location.search).get("id");
  const htmlProduct = getProductHtmlElement();
  getOneProduct(id).then((product) => {
    htmlProduct[
      "item__img"
    ].innerHTML = `<img src="${product.imageUrl}" alt="Photographie d'un canapé">`;
    htmlProduct["title"].innerHTML = `${product.name}`;
    htmlProduct["price"].innerHTML = `${product.price}`;
    htmlProduct["description"].innerHTML = `${product.description}`;
    for (const color of product.colors) {
      htmlProduct[
        "colors"
      ].innerHTML += `<option value="${color}">${color}</option>`;
    }
  });
}

fillOneProduct();
