window.onload = () => {
    getUsername();
    renderProductDetails();
  
    document.querySelector(".cart-btn").addEventListener("click", addCart);
  };
  
  // Global variable
  let processedData;
  let selectedProductVariantId;
  
  // <!---------------------------getUsername----------------------------------------------->
  async function getUsername() {
    let httpResponse = await fetch("/username");
    let result;
  
    if (httpResponse.status == 200) {
      result = await httpResponse.json();
  
      console.log("username", result);
  
      document.querySelector(
        "#username-display"
      ).innerHTML = `<button class=btn btn-out line-success" type="submit"><img src="../image/icon/user-interface.png" id="user-loginedlogo" ;>${result.data} </button>`;
  
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
  
  // <!---------------------------logout----------------------------------------------->
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
  
  document.querySelector(".cart-btn").onclick = function () {
    console.log("test button");
  };
  

  