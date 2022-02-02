/*

- Map orderID DOM element with associated URL param
*/

function displayOrderId() {
  document.getElementById("orderId").innerHTML = new URLSearchParams(
    window.location.search
  ).get("orderId");
}

displayOrderId();
localStorage.clear();
