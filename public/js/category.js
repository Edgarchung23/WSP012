async function getProducts() {
  let res = await fetch("/product");
  let result = await res.json();
  console.log(result);
  return result;
}

window.onload = async (req, res) => {
  //   console.log(`check js-10`);
  let data = await getProducts();
  let allProduct = "";
  for (let entry of data) {
    allProduct += `
    <div class="productBox1">
    <img src="${entry.image}" class="product_img_1"/>
    <div class="productBoxBody">
    <h5 class="product_title"> ${entry.name}</h5>
    <p class="product_text"> ${entry.brand}
    ${entry.category_id}
    $${entry.unit_price}
    ${entry.material}</p>
    <a href="/product.html" class="btn btn-primary">Go to order</a>
    </div>
    </div>
    `;
  }
  document.querySelector(".product_Area").innerHTML = allProduct;
  getUsername();
};

async function getUsername() {
  let httpResponse = await fetch("/username");
  let result;

  if (httpResponse.status == 200) {
    result = await httpResponse.json();

    console.log("username", result);

    document.querySelector(
      "#username-display"
    ).innerHTML = `<button class=btn btn-out line-success" type="submit"> Welcome ${result.data} </button>`;

    document.querySelector(
      "#logout-area"
    ).innerHTML = `<button class="btn btn-outline-secondary" onclick="logout()">
      Log out 
      </button>`;

    addLogoutEventListener();
  } else {
    result = await httpResponse.json();
  }
}
