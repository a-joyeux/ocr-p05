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
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
  });
}

function displaySummary() {
  const totalQty = getCart().reduce((prev, next) => prev.qty + next.qty);
  const totalPrice = getCart().reduce(
    (prev, next) => parseInt(prev.product.price) + parseInt(next.product.price)
  );
  console.log(totalPrice);
  let divTotalQty = document.getElementById("totalQuantity");
  let divTotalPrice = document.getElementById("totalPrice");

  divTotalQty.innerHTML = totalQty;
  divTotalPrice.innerHTML = totalPrice;
}

function removeFromCart() {
  let article = document.getElementById("dd");
}

if (localStorage.getItem("Cart")) {
  displayCart();
  displaySummary();
}
