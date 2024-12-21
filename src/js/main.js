import { LOCALSTORAGE_USERNAME } from "./constants.js";
import { LetterStatus } from "./enums.js";
import { TypeText } from "./type-text.js";

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
    wpmResult.innerText = Math.floor(wpm) + " WPM";
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
