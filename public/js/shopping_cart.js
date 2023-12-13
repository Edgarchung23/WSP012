window.onload = () => {
  getUsername();
  renderCartProducts();
};

// <!---------------------------getUsername----------------------------------------------->
async function getUsername() {
  let httpResponse = await fetch("/username");
  let result;

  if (httpResponse.status == 200) {
    result = await httpResponse.json();

    document.querySelector(
      "#username-display"
    ).innerHTML = `<button class=btn btn-outline-success" type="submit"><img src="../image/icon/user-interface.png" id="user-loginedlogo" ;> ${result.data} </button>`;

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

// <!---------------------------renderCartProducts----------------------------------------------->

async function renderCartProducts() {
  let res = await fetch("/addToCart");
  console.log(res);
  let data = await res.json();
  let cartProduct = "";

  for (let entry of data) {
    cartProduct += `
    <div class="pcard">
    <div class="card-body p-4">
        <div class="row d-flex justify-content-between align-items-center">
            <div class="col-md-2 col-lg-2 col-xl-2">
                <img src="${entry.image}" class="img-fluid rounded-3"
                    alt="">
            </div>
            <div class="col-md-3 col-lg-3 col-xl-3">
                <p class="lead fw-normal mb-2">${entry.name}</p>
                <p><span class="text-muted">Size: </span>M <span class="text-muted">Color:
                    </span>Grey</p>
            </div>
            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                <button class="btn btn-link px-2"
                    onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                    <i class="fas fa-minus"></i>
                </button>

                <input id="form1" min="0" name="quantity" value="2" type="number"
                    class="form-control form-control-sm" />

                <button class="btn btn-link px-2"
                    onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h5 class="mb-0">${entry.unit_price}</h5>
            </div>
            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <a href="#!" class="text-danger"><i class="fas fa-trash fa-lg"></i></a>
            </div>
        </div>
    </div>

    `;
  }
  document.querySelector(".col-10").innerHTML = cartProduct;
}
