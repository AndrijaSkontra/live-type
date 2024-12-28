import { LOCALSTORAGE_USERNAME } from "./constants.js";
import { TypeText } from "./type-text.js";
import { LetterStatus } from "./enums.js";
import { BACKEND_URL } from "./secret.js";

console.log("app starting");

let typeText = new TypeText(await getWords());
typeText.paintLetters();

const restartButton = document.getElementById("restart-button");
const wpmResult = document.getElementById("wpm-result");

console.log("username:", localStorage.getItem(LOCALSTORAGE_USERNAME));

restartButton.addEventListener("click", async (e) => {
  restartGame();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    restartGame();
  }
});

document.addEventListener("keypress", (e) => {
  if (!typeText.typingStarted) {
    typeText.typingStarted = true;
    typeText.startTimer();
  }

  typeText.borderAroundCurrentLetter();

  const currentLetter = typeText.getCurrentLetter();

  if (currentLetter.value === e.key) {
    currentLetter.status = LetterStatus.HIT;
    typeText.nextLetter();
    currentLetter.changeColor();
  } else {
    currentLetter.status = LetterStatus.MISS;
    currentLetter.changeColor();
  }
  if (typeText.isCompleted()) {
    //  TODO: fetch post guest and wpm
    typeText.endTimer();
    const timeSpend = typeText.endTime - typeText.startTime;

    const wpm = typeText.typeLetters.length / 5 / (timeSpend / 60000);
    const wpmFinal = Math.floor(wpm);
    wpmResult.innerText = wpmFinal + " WPM";

    fetch(`${BACKEND_URL}/user`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: localStorage.getItem(LOCALSTORAGE_USERNAME),
        wpm: wpmFinal,
      }),
    }).catch((e) => console.log(e.message));
  }
});

async function restartGame() {
  typeText = new TypeText(await getWords());
  typeText.paintLetters();
  restartButton.blur();
}

async function getWords() {
  const wordListFn = await fetch(
    "https://random-word-api.vercel.app/api?words=5",
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch(() => console.error("err, can't fetch data"));

  const typerTextFromDB = wordListFn.reduce(
    (accumulator, word) => accumulator + " " + word,
    "",
  );
  return typerTextFromDB.trim();
}
