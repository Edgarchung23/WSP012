window.onload = () => {
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
document.querySelector(".color-choose").innerHTML = ` `;


console.log("js-114-Check processed", processedData);
for (let key in processedData) {
  console.log("js-117-", key, "dict", colorDict[key]);
  document.querySelector(".color-choose").innerHTML += `
    <div   id='${colorDict[key]}-button'>
      <input data-image="${colorDict[key]}" type="radio" id="${colorDict[key]}" name="color" value="${colorDict[key]}" onclick="renderSize('${colorDict[key]}')">
      <label for="${colorDict[key]}"><span></span></label>
    </div>`;
}
