window.onload = () => {
  getUsername();
};

// <!---------------------------getUsername----------------------------------------------->
async function getUsername() {
  let httpResponse = await fetch("/username");
  let result;

  if (httpResponse.status == 200) {
    result = await httpResponse.json();

    document.querySelector(
      "#username-display"
    ).innerHTML = `<button class=btn btn-outline-success" type="submit"><img src="../image/user-interface.png" id="user-loginedlogo" ;> ${result.data} </button>`;

    document.querySelector(
      "#logout-area"
    ).innerHTML = `<button class="btn btn-outline-secondary" onclick="logout()"><img src="../image/logout.png" id="logout-logo" ;>
          Log out 
          </button>`;

    addLogoutEventListener();
  } else {
    result = await httpResponse.json();
  }
}
// <!---------------------------getCartProduct----------------------------------------------->
async function getCartProducts() {
  let res = await fetch("/addToCart");
  let result = await res.json();
  console.log(result);
  return result;
}

// <!---------------------------renderCartProducts----------------------------------------------->
async function renderCartProducts(id) {
  let data = await getCartProducts(id);
  let cartProduct = "";
  for (let entry of data) {
    cartProduct += `
    <h5 class="product_title"> ${entry.id}</h5>
    <h5 class="product_text">$${333}</h5><a href='/product.html?id=${222}' class="btn btn-primary">More Details</a>
    </div>
    </div>
    `;
  }
  document.querySelector(".col-10").innerHTML = cartProduct;
}
