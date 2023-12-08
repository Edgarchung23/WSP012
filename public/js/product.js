$(document).ready(function () {
  $(".color-choose input").on("click", function () {
    var headphonesColor = $(this).attr("data-image");

    $(".active").removeClass("active");
    $(".left-column img[data-image = " + headphonesColor + "]").addClass(
      "active"
    );
    $(this).addClass("active");
  });
});

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

async function logout() {
  console.log("trying logout");

  await fetch("/logout");

  window.location.reload();
}
