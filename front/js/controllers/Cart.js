function checkoutCart(order) {
  return fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
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

export { checkoutCart };
