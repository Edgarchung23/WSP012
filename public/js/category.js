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
};
