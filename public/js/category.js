async function getProducts() {
  let res = await fetch("/category");
  let result = await res.json();
  console.log(result);
  console.log(`check js-5`);
  return result;
}

window.onload = async (req, res) => {
  console.log(`check js-10`);
  let data = await getProducts();
  console.log("data", data);
  let allCategory = "";
  for (let entry of data) {
    allCategory += `
       <div class="productBox1">
          <img src="image/{yoga_mat_1.webp}" class="product_img_1" alt="..." />
          <div class="productBoxBody">
          <h5 class="product_title">$(entry.name)</h5>
          <p class="product_text"> $(entry.brand)
          $(entry.category_id)
          $(entry.unit_price)
          $(material)
          $(image) </p>
          <a href="/html/category.html" class="btn btn-primary">Go to order</a>
          </div>
          </div>
          `;
  }
  document.querySelector(".product_Area").innerHTML = allCategory;
};
