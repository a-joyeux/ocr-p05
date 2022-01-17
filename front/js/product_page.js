import { getOneProduct, getProductHtmlElement } from "./controllers/Product.js";
import Product from "./models/Product.js";

/* 

1- Create the cart in localstorage if not exists
2- Check if the product added is already in the cart
3- If yes -> Sum the qty added and the qty in the cart
    If not -> Add it to the cart

*/

function submitCart() {
  let cart = [];
  let productLine = {};
  let inputQty = document.getElementById("quantity").value;
  if (localStorage.getItem("Cart")) {
    cart = JSON.parse(localStorage.getItem("Cart"));
  }
  let existing_item = cart.find((elem) => {
    return elem.product._id == JSON.parse(localStorage.getItem("Product"))._id;
  });
  if (existing_item) {
    existing_item.qty += parseInt(inputQty);
  } else {
    productLine = {
      qty: parseInt(inputQty),
      product: JSON.parse(localStorage.getItem("Product")),
    };
    cart.push(productLine);
  }
  localStorage.setItem("Cart", JSON.stringify(cart));
}

function fillOneProduct() {
  const id = new URLSearchParams(window.location.search).get("id");

  const htmlProduct = getProductHtmlElement();
  getOneProduct(id).then((entry) => {
    const product = new Product(entry);
    localStorage.setItem("Product", JSON.stringify(product));
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
const submitBtn = document.getElementById("addToCart"); // On récupère l'élément sur lequel on veut détecter le clic
submitBtn.addEventListener("click", submitCart);
