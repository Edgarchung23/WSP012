let slideIndex = 0;
showSlides();
registercheckemailAction();
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
document.querySelector("#registerbutton").addEventListener("submit", (e) => {
  e.preventDefault();
});

function registercheckemailAction() {
  let target = document.querySelector("#register-form");

  target.addEventListener("submit", async (e) => {
    console.log("login submit triggered");
    e.preventDefault();

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: target.email.value,
        password: target.password.value,
      }),
    });
  });
}

// function overrideLoginDefaultAction() {
//   let target = document.querySelector("#login-form");

//   target.addEventListener("submit", async (e) => {
//     console.log("login submit triggered");
//     e.preventDefault();

//     const res = await fetch("/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: target.email.value,
//         password: target.password.value,
//       }),
//     });

//     if (res.status == 200) {
//       const result = await res.json();
//       console.log(result);

//       window.location.href = "/";
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Login Failed",
//       });
//     }
//   });
// }
//<---------------------------------------------------------->
// window.onload = async () => {
//   let data = await getMemos();
//   let getUsernameRes = await fetch("/username");
//   let getUsernameResult = await getUsernameRes.json();

//   if (getUsernameResult.message == "success") {
//     document.querySelector(
//       ".Logout-button-area"
//     ).innerHTML = `<button id="Logout-button"> 登出  </button>`;

//     addLogoutEventListener();
//   }

//   let finalHTML = "";

//   for (let entry of data) {
//     finalHTML += `<div id="memos-${entry.id}">
//     <div class="memo" >
//     ${entry.description}
//     ${
//       getUsernameResult.message == "success"
//         ? `<div class="control-button-area">
//     <i class="fa-solid fa-trash-can" onclick="deleteMemo(${entry.id})" ></i>
//     <i class="fa-solid fa-pen-to-square" onclick="triggerEdit(${entry.id},'${entry.description}')" ></i>
//     </div>`
//         : ""
//     }

//     ${
//       entry.image
//         ? `<img class="uploadImage" src="/image/${entry.image}" />`
//         : ""
//     }
//       </div></div>`;
//   }
//   document.querySelector(".memo-area").innerHTML = finalHTML;
// };
