const socketClient = io();

socketClient.on("cart", data => {
  render(data);
});

function render(data) {
  console.log(data);
  const html = data.products
    .map(product => {
      return `<div class="product">
      <p class="messageUser">${product.user}:</p> <p class="messageText">${product.message}</p>
      </div>
      `;
    })
    .join(" ");
  document.getElementById("cart").innerHTML = html;
}

function searchCart() {
  const cartsId = document.getElementById("cartsId").value;

  if (cartsId) {
    socketClient.emit("cart", cartsId);
    const form = document.getElementById("searchCart");
    form.reset();
  }
}
