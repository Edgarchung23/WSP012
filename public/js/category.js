window.onload = async (req, res) => {
  // getProducts_variant();
  let urlParams = new URLSearchParams(window.location.search);
  let targetId = urlParams.get("id");
  console.log(targetId);
  renderProducts(targetId);
  getUsername();
};

async function getProducts() {
  let res = await fetch("/product");
  let result = await res.json();
  console.log(result);
  return result;
}
// async function getProducts_variant() {
//   let params = new URLSearchParams(location.search);
//   let res = await fetch("product/id?id=" + params.get("id"));
//   let result = await res.json();
//   return result;
// }

//<---GET PRODUCTS----------------------------------------------------------------------------------------------------------->
async function getProducts(id) {
  if (id) {
    let httpRes = await fetch(`/category?id=${id}`);
    let resp = await httpRes.json();
    return resp.data;
  } else {
    let httpRes = await fetch(`/category`);
    let resp = await httpRes.json();
    return resp.data;
  }
}
//<---RENDER PRODUCTS----------------------------------------------------------------------------------------------------------->
async function renderProducts(id) {
  let data = await getProducts(id);
  console.log("check data", data);
  let allProduct = "";
  for (let entry of data) {
    allProduct += `
    <div class="productBox1">
    <img src="${entry.image}" class="product_img_1"/>
    <div class="productBoxBody">
    <h5 class="product_title"> ${entry.name}</h5>
    <h5 class="product_text">
    $${entry.unit_price}</h5>
    <a href='/product.html?id=${entry.id}' class="btn btn-primary">Add to cart</a>
    </div>
    </div>
    `;
  }
  document.querySelector(".product_Area").innerHTML = allProduct;
  getUsername();
}
//<---GET USERNAME----------------------------------------------------------------------------------------------------------->
async function getUsername() {
  let httpResponse = await fetch("/username");
  let result;

  if (httpResponse.status == 200) {
    result = await httpResponse.json();

    console.log("username", result);

    document.querySelector(
      "#username-display"
    ).innerHTML = `<button class=btn btn-out line-success" type="submit"><img src="../image/user-interface.png" id="user-loginedlogo" ;>${result.data} </button>`;

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
//<---LOG OUT----------------------------------------------------------------------------------------------------------->
async function logout() {
  console.log("trying logout");

  await fetch("/logout");

  window.location.reload();
}

//<---CHAT----------------------------------------------------------------------------------------------------------->

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
