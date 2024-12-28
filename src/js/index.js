import { LOCALSTORAGE_USERNAME } from "./constants.js";
import { BACKEND_URL } from "./secret.js";

const usernameInput = document.getElementById("username-input");

usernameInput.addEventListener("input", (e) => {
  const username = e.target.value;
  console.log("hahah", LOCALSTORAGE_USERNAME);
  if (!username || username.length < 3 || username.length > 30) {
    localStorage.setItem(LOCALSTORAGE_USERNAME, "guest");
  } else {
    localStorage.setItem(LOCALSTORAGE_USERNAME, username);
  }
});

const res = fetch(`${BACKEND_URL}/game-scores`).then((res) => {
  console.log("fetch on scores status: ", res.status);
  if (res.status === 200) {
    return res.json();
  }
});

const gameScores = await res;
