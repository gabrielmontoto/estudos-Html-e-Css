const query = (element) => document.querySelector(element);
const queryAll = (element) => document.querySelectorAll(element);

let pizzaQuantity = 0;
let orderCard = [];
let lastSelectedPizza = 0;

pizzaJson.map((item, index) => {
  let pizzaItem = document.querySelector(".models .pizza-item").cloneNode(true);

  pizzaItem.setAttribute("data-key", index);
  pizzaItem.querySelector(".pizza-item--img img").src = item.img;
  pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
  pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;
  pizzaItem.querySelector(
    ".pizza-item--price"
  ).innerHTML = `R$ ${item.price.toFixed(2)}`;

  pizzaItem.querySelector("a").addEventListener("click", pizzaItemClick);

  document.querySelector(".pizza-area").append(pizzaItem);
});

function pizzaItemClick(event) {
  event.preventDefault();

  pizzaQuantity = 1;

  let clickedPizza = event.target
    .closest(".pizza-item")
    .getAttribute("data-key");

  lastSelectedPizza = clickedPizza;

  query(".pizzaInfo h1").innerHTML = pizzaJson[clickedPizza].name;
  query(".pizzaInfo--desc").innerHTML = pizzaJson[clickedPizza].description;
  query(".pizzaBig img").src = pizzaJson[clickedPizza].img;
  query(".pizzaInfo--actualPrice").innerHTML = `R$ ${pizzaJson[
    clickedPizza
  ].price.toFixed(2)}`;

  query(".pizzaInfo--qt").innerHTML = pizzaQuantity;
  query(".pizzaInfo--size.selected").classList.remove("selected");
  queryAll(".pizzaInfo--size").forEach((size, index) => {
    if (index == 2) size.classList.add("selected");
    size.querySelector("span").innerHTML = pizzaJson[clickedPizza].sizes[index];
  });

  let pizzaWindowStyle = query(".pizzaWindowArea").style;

  pizzaWindowStyle.opacity = 0;
  pizzaWindowStyle.display = "flex";

  setTimeout(() => {
    pizzaWindowStyle.opacity = 1;
  }, 200);
}

queryAll(".pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton").forEach(
  (item) => {
    item.addEventListener("click", closeModal);
  }
);
function closeModal() {
  let pizzaWindowStyle = query(".pizzaWindowArea").style;
  pizzaWindowStyle.opacity = 0;
  setTimeout(() => {
    pizzaWindowStyle.display = "none";
  }, 500);
}

query(".pizzaInfo--qtmenos").addEventListener("click", decreaseQuantity);
query(".pizzaInfo--qtmais").addEventListener("click", increaseQuantity);
queryAll(".pizzaInfo--size").forEach((size, index) => {
  size.addEventListener("click", (event) => {
    query(".pizzaInfo--size.selected").classList.remove("selected");
    size.classList.add("selected");
  });
});
query(".pizzaInfo--addButton").addEventListener("click", addToOrderCart);
query(".menu-openner").addEventListener("click", openMobileCart);
query(".menu-closer").addEventListener("click", closeMobileCart);

function increaseQuantity() {
  pizzaQuantity++;
  query(".pizzaInfo--qt").innerHTML = pizzaQuantity;
}
function decreaseQuantity() {
  pizzaQuantity--;
  if (pizzaQuantity <= 0) {
    closeModal();
  }
  query(".pizzaInfo--qt").innerHTML = pizzaQuantity;
}

function addToOrderCart() {
  let sizeSelected = parseInt(
    query(".pizzaInfo--size.selected").getAttribute("data-key")
  );

  let identifier = pizzaJson[lastSelectedPizza].id + "@" + sizeSelected;

  let key = orderCard.findIndex((item) => {
    return item.identifier === identifier;
  });
  if (key > -1) {
    orderCard[key].quantity += pizzaQuantity;
  } else
    orderCard.push({
      identifier,
      id: pizzaJson[lastSelectedPizza].id,
      size: sizeSelected,
      quantity: pizzaQuantity,
    });
  closeModal();
  updateOrderCart();
}

function updateOrderCart() {
  query(".menu-openner span").innerHTML = orderCard.length;

  if (orderCard.length > 0) {
    query("aside").classList.add("show");
    query(".cart").innerHTML = "";

    let subTotal = 0;
    let discount = 0;
    let total = 0;

    for (const key in orderCard) {
      let pizzaItem = pizzaJson.find((item) => {
        return item.id === orderCard[key].id;
      });

      subTotal += orderCard[key].quantity * pizzaItem.price;
      let orderCartItem = query(".models .cart--item").cloneNode(true);

      let pizzaSizeName;
      switch (orderCard[key].size) {
        case 0:
          pizzaSizeName = "P";

          break;
        case 1:
          pizzaSizeName = "M";
          break;
        case 2:
          pizzaSizeName = "G";
          break;
      }

      orderCartItem.querySelector("img").src = pizzaItem.img;
      orderCartItem.querySelector(".cart--item-nome").innerHTML =
        pizzaItem.name + ` (${pizzaSizeName})`;
      orderCartItem.querySelector(".cart--item--qt").innerHTML =
        orderCard[key].quantity;

      orderCartItem
        .querySelector(".cart--item-qtmenos")
        .addEventListener("click", () => {
          orderCard[key].quantity--;
          if (orderCard[key].quantity <= 0) {
            orderCard.splice(key, 1);
          }
          updateOrderCart();
        });
      orderCartItem
        .querySelector(".cart--item-qtmais")
        .addEventListener("click", () => {
          orderCard[key].quantity++;
          updateOrderCart();
        });
      query(".cart").append(orderCartItem);

      discount = subTotal * 0.1;
      total = subTotal - discount;

      query(".subtotal span:last-child").innerHTML = `R$ ${subTotal.toFixed(
        2
      )}`;
      query(".desconto span:last-child").innerHTML = `R$ ${discount.toFixed(
        2
      )}`;
      query(".total span:last-child").innerHTML = `R$ ${total.toFixed(2)}`;
    }
  } else {
    query("aside").classList.remove("show");
    closeMobileCart();
  }
}

function openMobileCart() {
  if (orderCard.length <= 0) return;
  query("aside").style.left = 0;
}

function closeMobileCart() {
  query("aside").style.left = "100vw";
}
