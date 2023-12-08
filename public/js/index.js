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
    setTimeout(showSlides, 6000); // Change image every 2 seconds
  }

  getUsername();
};

//<------------------------------------------------------------------------------------------------------------------>
async function getUsername() {
  let httpResponse = await fetch("/username");
  let result;

  if (httpResponse.status == 200) {
    result = await httpResponse.json();

    console.log("name", result);

    document.querySelector(
      "#username-display"
    ).innerHTML = `<button class=btn btn-out line-success" type="submit"> Welcome ${result.data} </buttons>`;

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

async function logout() {
  console.log("trying logout");

  await fetch("/logout");

  window.location.reload();
}
//<------------------------------------------------------------------------------------------------------------------>
