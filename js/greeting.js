const greeting = document.querySelector("#greeting");

const nameForm = document.querySelector("#greeting form");
const nameInput = document.querySelector("#greeting form input");

const sayHelloName = document.querySelector("#greeting h2");
let hello = "";

const localSavedName = localStorage.getItem("nameOfUser");

function saveName() {
  localStorage.setItem("nameOfUser", nameInput.value);
  nameForm.classList.add("hidden");
  paintName();
}

function paintName() {
  const now = new Date();
  const hour = now.getHours();

  if (4 < hour && hour < 12) {
    hello = "Good Morning";
  } else if (11 < hour && hour < 16) {
    hello = "Good Afternoon";
  } else if (17 < hour && hour < 20) {
    hello = "Good Evening";
  } else {
    hello = "Sweet Dream";
  }

  sayHelloName.innerText = `${hello}, ${localSavedName}`;
}

if (localSavedName === null) {
  nameForm.classList.remove("hidden");
  sayHelloName.classList.add("hidden");
  nameForm.addEventListener("submit", saveName);
} else {
  paintName();
}

setInterval(paintName, 1000);
