export function getAllProduct() {
  return fetch("http://localhost:3000/api/products")
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        context.log("Response is invalid");
      }
    })
    .catch(function (error) {
      console.log("getAllProduct error : " + error.message);
    });
}

export function getOneProduct(id) {
  return fetch(`http://localhost:3000/api/products/${id}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        context.log("Response is invalid");
      }
    })
    .catch(function (error) {
      console.log("getOneProduct error : " + error.message);
    });
}

export function getProductHtmlElement() {
  let obj = {};
  obj["item__img"] = document.getElementsByClassName("item__img")[0];
  obj["title"] = document.getElementById("title");
  obj["price"] = document.getElementById("price");
  obj["description"] = document.getElementById("description");
  obj["colors"] = document.getElementById("colors");
  return obj;
}
