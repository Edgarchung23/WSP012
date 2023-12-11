document
  .querySelector("#register-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    let res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    if (res.status == 200) {
      Swal.fire({
        icon: "success",
        title: "Registered",
      }).then((result) => {
        if (result.isConfirmed) {
          // console.log("redirect to login page");
          window.location.href = "/login.html";
        }
      });
    } else {
      let result = await res.json();

      // console.log(result);

      Swal.fire({
        icon: "error",
        title: " Error",
        text: result.message,
      });
    }
  });

// <!---------------------------chat----------------------------------------------->
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
