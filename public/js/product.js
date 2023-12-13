window.onload = () => {
  getUsername();
  renderProductDetails();
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

    // console.log("username", result);

    document.querySelector(
      "#username-display"
    ).innerHTML = `<button class=btn btn-out line-success" type="submit"><img src="../image/icon/user-interface.png" id="user-loginedlogo" ;>${result.data} </button>`;

    document.querySelector(
      "#logout-area"
    ).innerHTML = `<button class="btn btn-outline-secondary" onclick="logout()"><img src="../image/icon/logout.png" id="logout-logo" ;>
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

// <!---------------------------addToCartBtn Hover----------------------------------------------->

let addToCartBtn = document.querySelector(".cart-btn");
let opt = {
  initialText: "Add to Cart",
  textOnClick: "Item Added",
  interval: 2000,
};
let setAddToCartText = () => {
  addToCartBtn.innerHTML = opt.textOnClick;
  let init = () => {
    addToCartBtn.innerHTML = opt.initialText;
  };
  setTimeout(init, opt.interval);
};

addToCartBtn.addEventListener("click", setAddToCartText);

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

  document.querySelector(".left-column").innerHTML = `
    <img src= "/${result[0].category_name}/${result[0].image}" class="product_var"/>`;

  document.querySelector(".product-description").innerHTML = `
  <h5>${result[0].category_name}<br>
   <h2>${result[0].product_name}</h2><br><br>
   <h5>${result[0].description}<br><br>
   <h6>Brand : ${result[0].brand}</h6>
   <h6>Material : ${result[0].material}</h6><br><br><br>
<h2 class="product_text">Price : $${result[0].unit_price}</h2></h5>`;

  processedData = await getProductVariant();
  console.log(Object.keys(processedData).length);
  if (Object.keys(processedData).length > 1) {
    document.querySelector(".color-choose").innerHTML = ` `;
    console.log("js-114-Check processed", processedData);
    for (let key in processedData) {
      console.log("js-117-", key, "dict", colorDict[key]);
      document.querySelector(".color-choose").innerHTML += `
    <div   id='${colorDict[key]}-button'>
      <input data-image="${colorDict[key]}" type="radio" id="${colorDict[key]}" name="color" value="${colorDict[key]}" onclick="renderSize('${colorDict[key]}')">
      <label for="${colorDict[key]}"><span></span></label>
    </div>`;
    }
  } else {
    document.querySelector(".option-area").innerHTML = ``;

    selectedProductVariantId = processedData[0].id;
  }
}

// <!--------------------------- get product variant ----------------------------------------------->

async function getProductVariant() {
  const urlParams = new URLSearchParams(window.location.search);
  const targetId = urlParams.get("id");
  let res = await fetch(`/product_variant?id=${targetId}`);
  let result = await res.json();
  console.log("js-136-Check result ", result);

  if (result.data.length > 1) {
    console.log(result.data.length);
    console.log(result.data);
    return combineColors(result.data);
  } else {
    console.log(result.data.length);
    console.log(result.data);
    return result.data;
  }
}

// <!--------------------------- combineColors ----------------------------------------------->

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
      console.log("js-163-Check color added just now ");
    }
  }
  console.log("js-167-Check", final);
  return final;
}
// <!--------------------------- renderSize ----------------------------------------------->

async function renderSize(key) {
  console.log("js-172-", key, reverseDict[key]);
  let finalHTML = "";
  for (let entry of processedData[reverseDict[key]]) {
    console.log("js-175-", entry);
    finalHTML += `<button onclick="logSelectedProductVariantId(${entry.product_variant_id})">${entry.size}</button>`;
  }
  document.querySelector(".size-choose").innerHTML = finalHTML;
}

function logSelectedProductVariantId(targetId) {
  selectedProductVariantId = targetId;
  console.log("js-184-Check variant id =", selectedProductVariantId);
}

// <!--------------------------- add to cart ----------------------------------------------->

async function addCart() {
  console.log("js-189-Checked add to cart");

  let res = await fetch("/addToCart", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product_variant_id: selectedProductVariantId }),
  });
}
document.querySelector(".cart-btn").addEventListener("click", addCart);
