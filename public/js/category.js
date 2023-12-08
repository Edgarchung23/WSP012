console.log(`111111`);

async function getProducts() {
  console(`check`);
  let res = await fetch("/category.html");
  let result = await res.json();
  console.log(result);
  return result;
}

window.onload = async (req, res) => {
  let data = await getProducts();
  let allCategory = "";
  for (let entry of data) {
    allCategory += `
     <div class="productBox1">
        <img src="/public/image/yoga_mat/${yoga_mat_1.webp}" class="product_img_1" alt="..." />
        <div class="productBoxBody">
        <h5 class="product_title">$(entry.name)</h5>
        <p class="product_text"> $(entry.brand)
        $(entry.category_id)
        $(entry.unit_price)
        $(material)
        $(image) </p>
        <a href="public/html/category.html" class="btn btn-primary">Go to order</a>
        </div>
        </div>
        `;
  }
  document.querySelector(".product_Area").innerHTML = allCategory;
};
