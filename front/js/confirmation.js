function displayOrderId() {
  const orderId = localStorage.getItem("orderId")
    ? localStorage.getItem("orderId")
    : null;
  document.getElementById("orderId").innerHTML = orderId;
}

displayOrderId();
localStorage.clear();
