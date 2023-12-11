window.onload = () => {
  let slideIndex = 0;
  showSlides();
  function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 3000); // Change image every 2 seconds
  }
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

// <!---------------------------getUsername----------------------------------------------->
async function addToCart(product_id) {
  console.log("check id", product_id);
  await fetch("/addTocart", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product_id: product_id }),
  });
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
