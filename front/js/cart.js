import { checkoutCart } from "./controllers/Cart.js";
import { getOneProduct } from "./controllers/Product.js";
import Contact from "./models/Contact.js";
import Order from "./models/Order.js";
import { getCart, formDataToObject } from "./utils/utils.js";

async function displayCart() {
  let divCartItems = document.getElementById("cart__items");
  divCartItems.innerHTML = "";
  getCart().map((productLine) => {
    getOneProduct(productLine.product._id).then((product) => {
      divCartItems.innerHTML += `<article class="cart__item" data-id="${
        productLine.product._id
      }" data-color="${productLine.color}">
                <div class="cart__item__img">
                  <img src="${
                    productLine.product.imageUrl
                  }" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${productLine.product.name}</h2>
                    <p>${productLine.color}</p>
                    <p>${parseFloat(product.price) * productLine.qty} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${productLine.qty}</p>
                      <input data-id="${productLine.product._id}" data-color="${
        productLine.color
      }" type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
        productLine.qty
      }">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" data-id="${
                        productLine.product._id
                      }" data-color="${productLine.color}">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
      divCartItems.querySelectorAll(".deleteItem").forEach((item) => {
        item.addEventListener("click", removeFromCart);
      });
      divCartItems.querySelectorAll("input").forEach((item) => {
        item.addEventListener("blur", modifyQty);
      });
    });
  });
}

/* 

Display sum at the bottom (price & quantity)
- If cart has only one item ==> get the data of the first item)
- If the cart has more than one item ==> sum the all the data inside the array
- Else leave the qty at zero
*/

function displaySummary() {
  let totalPrice = 0;
  let totalQty = 0;
  let divTotalQty = document.getElementById("totalQuantity");
  let divTotalPrice = document.getElementById("totalPrice");
  getCart().map((productLine) => {
    getOneProduct(productLine.product._id).then((product) => {
      totalPrice += parseInt(product.price) * parseInt(productLine.qty);
      totalQty += parseInt(productLine.qty);
      divTotalPrice.innerHTML = totalPrice;
      divTotalQty.innerHTML = totalQty;
    });
    // in case of empty cart
    divTotalPrice.innerHTML = totalPrice;
    divTotalQty.innerHTML = totalQty;
  });
}

function removeFromCart(event) {
  const productId = event.target.getAttribute("data-id");
  const productColor = event.target.getAttribute("data-color");

  const newCart = getCart().filter((elem) => {
    return (
      elem.product._id != productId ||
      (elem.product._id == productId && elem.color != productColor)
    );
  });
  localStorage.setItem("Cart", JSON.stringify(newCart));
  document.querySelectorAll(".cart__item").forEach((elem) => {
    if (
      elem.getAttribute("data-id") == productId &&
      elem.getAttribute("data-color") == productColor
    ) {
      elem.remove();
    }
  });
  displaySummary();
}

function checkFormInput(field, value) {
  const hasNumber = /\d/;

  if (hasNumber.test(value)) {
    document.getElementById(`${field}ErrorMsg`).innerHTML =
      "Les chiffres sont interdits";
    return false;
  }
  document.getElementById(`${field}ErrorMsg`).innerHTML = "";
  return true;
}

function isCartEmpty(cart) {
  if (cart.length == 0) {
    alert("Le panier ne doit pas être vide");
    return false;
  }
  return true;
}

function submitCart(formObject) {
  const contact = new Contact(formObject);
  const products = getCart().map((elem) => elem.product._id);
  const order = new Order(contact, products);
  checkoutCart(order).then((response) => {
    localStorage.setItem("orderId", response.orderId);
    //window.location.href = "confirmation.html";
  });
}

function modifyQty(event) {
  const productId = event.target.getAttribute("data-id");
  const productColor = event.target.getAttribute("data-color");

  if (event.target.value < 1 || event.target.value > 100) {
    alert("Veuillez saisir une quantité comprise entre 1 et 100");
    return false;
  }
  const newCart = getCart().map((elem) => {
    if (elem.product._id == productId && elem.color == productColor) {
      elem.qty = event.target.value;
    }
    return elem;
  });
  localStorage.setItem("Cart", JSON.stringify(newCart));
  displayCart();
  displaySummary();
}

// On page load

displayCart();
displaySummary();

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formObject = formDataToObject(formData);
  if (
    checkFormInput("lastName", formObject["lastName"]) &&
    checkFormInput("firstName", formObject["firstName"]) &&
    isCartEmpty(getCart())
  ) {
    submitCart(formObject);
  }
});

document.querySelectorAll("input").forEach((elem) => {
  elem.addEventListener("blur", (e) => {
    const key = e.target.getAttribute("id");
    e.target.reportValidity();
    if (key == "firstName" || key == "lastName") {
      checkFormInput(key, e.target.value);
    }
  });
});
