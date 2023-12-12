window.onload = () => {
  getUsername();
  renderProductDetails();

  document.querySelector(".cart-btn").addEventListener("click", addCart);
};

// Global variable
let processedData;
let selectedProductVariantId;

// <!---------------------------getUsername----------------------------------------------->
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

// <!---------------------------logout----------------------------------------------->
async function logout() {
  console.log("trying logout");

  await fetch("/logout");

  window.location.reload();
}

// <!---------------------------chat----------------------------------------------->

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

document.querySelector(".cart-btn").onclick = function () {
  console.log("test button");
};

// <!--------------------------- get product details ----------------------------------------------->

var colorDict = {
  粉紅色: "pink",
  淺紫色: "purple",
};

var reverseDict = {
  pink: "粉紅色",
  purple: "淺紫色",
};
async function renderProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const targetId = urlParams.get("id");

  let res = await fetch(`/product?id=${targetId}`);
  let result = await res.json();

  // let categoryRes = await fetch(`/category`);
  // let categoryResult = await categoryRes.json();

  document.querySelector(
    ".product-description"
  ).innerHTML = `  <h5>${result[0].category_name}<br>
   <h2>${result[0].product_name}</h2><br><br>
   <h5>${result[0].description}<br><br><br><br>
   <h5>Brand : ${result[0].brand}</h5>
   <h5>Material : ${result[0].material}</h5>  
<h2 class="product_text">Price : $${result[0].unit_price}</h2>
   
   </h5>`;

  processedData = await getProductVariant();

  document.querySelector(".color-choose").innerHTML = `

  `;

  console.log("check processed", processedData);

  for (let key in processedData) {
    console.log("key", key, "dict", colorDict[key]);
    document.querySelector(".color-choose").innerHTML += `
    <div   id='${colorDict[key]}-button'>
      <input data-image="${colorDict[key]}" type="radio" id="${colorDict[key]}" name="color" value="${colorDict[key]}" onclick="renderSize('${colorDict[key]}')">
      <label for="${colorDict[key]}"><span></span></label>
    </div>
    `;
  }
}

// <!--------------------------- get product variant ----------------------------------------------->

async function getProductVariant() {
  const urlParams = new URLSearchParams(window.location.search);
  const targetId = urlParams.get("id");

  let res = await fetch(`/product_variant?id=${targetId}`);

  let result = await res.json();
  console.log("check result 2", result);

  return combineColors(result.data);
  // return result;
}

async function combineColors(input) {
  let final = {};

  for (let entry of input) {
    if (final[entry.color] != undefined) {
      console.log("color added already");
      final[entry.color].push({
        product_variant_id: entry.id,
        size: entry.size,
        thickness: entry.thickness,
        unit_price: entry.unit_price,
      });
    } else {
      final[entry.color] = [
        {
          product_variant_id: entry.id,
          size: entry.size,
          thickness: entry.thickness,
          unit_price: entry.unit_price,
        },
      ];
      console.log("color added just now ");
    }
  }

  console.log(final);
  return final;
}

async function renderSize(key) {
  console.log("gg", key, reverseDict[key]);
  let finalHTML = "";
  for (let entry of processedData[reverseDict[key]]) {
    console.log("hihi3333", entry);

    finalHTML += `<button onclick="logSelectedProductVariantId(${entry.product_variant_id})">${entry.size}</button>`;
  }
  document.querySelector(".size-choose").innerHTML = finalHTML;
}

function logSelectedProductVariantId(targetId) {
  selectedProductVariantId = targetId;
  console.log(selectedProductVariantId);
}

// <!--------------------------- add to cart ----------------------------------------------->
async function addCart() {
  console.log("ggggggggg");
  // handle if not select product variant
  let res = await fetch("/addToCart", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product_variant_id: selectedProductVariantId }),
  });
}
