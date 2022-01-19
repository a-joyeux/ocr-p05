function getCart() {
  let cart = [];
  if (localStorage.getItem("Cart")) {
    cart = JSON.parse(localStorage.getItem("Cart"));
  }
  return cart;
}

function displayCart() {
  let divCartItems = document.getElementById("cart__items");
  getCart().map((productLine) => {
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
                    <p>${parseFloat(productLine.product.price)} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${productLine.qty}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" data-id="${
                        productLine.product._id
                      }" data-color="${productLine.color}">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
  });
  document.querySelectorAll(".deleteItem").forEach((item) => {
    item.addEventListener("click", removeFromCart);
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
  if (getCart().length > 1) {
    totalQty = getCart().reduce((prev, next) => prev.qty + next.qty);
    totalPrice = getCart().reduce(
      (prev, next) =>
        parseInt(prev.product.price) + parseInt(next.product.price)
    );
  } else if (getCart().length != 0) {
    totalQty = getCart()[0].qty;
    totalPrice = getCart()[0].product.price;
  }
  let divTotalQty = document.getElementById("totalQuantity");
  let divTotalPrice = document.getElementById("totalPrice");

  divTotalQty.innerHTML = totalQty;
  divTotalPrice.innerHTML = totalPrice;
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

if (getCart() && getCart().length > 0) {
  displayCart();
  displaySummary();
}

export { getCart };
