window.onload = () => {
  submitEventHandle();
};

function submitEventHandle() {
  document
    .querySelector("#login-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      console.log(e.target.email.value);
      console.log(e.target.password.value);

      let res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });

      if (res.status != 200) {
        let result = await res.json();
        console.log(result.message);
        Swal.fire({
          icon: "error",
          title: "Login Faild",
          text: result.message,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Login Success",
          text: "",
        }).then(() => {
          window.location.href = "/";
        });
      }
    });
}
