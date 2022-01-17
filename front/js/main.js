import { getAllProduct } from "./controllers/Product.js";

/* Get the product list from API and populate the DOM with each item */

function fillProductList(parent) {
  getAllProduct().then((products) => {
    products.map((entry) => {
      const product = `<a href="./product.html?id=${entry._id}">
            <article>
              <img
                src="${entry.imageUrl}"
                alt="${entry.altTxt}"
              />
              <h3 class="productName">${entry.name}</h3>
              <p class="productDescription">
                ${entry.description}
              </p>
            </article>
          </a>`;
      parent.innerHTML += product;
    });
  });
}
fillProductList(document.getElementById("items"));
