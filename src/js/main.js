import { LetterStatus } from "./enums.js";
import { TypeText } from "./type-text.js";
const restartButton = document.getElementById("restart-button");
const wpmResult = document.getElementById("wpm-result");

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

restartButton.addEventListener("click", async (e) => {
  restartGame();
});

async function restartGame() {
  typeText = new TypeText(await getWords());
  typeText.paintLetters();
  restartButton.blur();
}

let typeText = new TypeText(await getWords());
typeText.paintLetters();

const letterBox = document.getElementById("letters-box");

letterBox.addEventListener("mouseover", () => {
  console.log("mouseover");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    restartGame();
  }
});

document.addEventListener("keypress", (e) => {
  console.log("e: ", e.key);

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
    typeText.endTimer();
    const timeSpend = typeText.endTime - typeText.startTime;
    console.log("timeSpend: ", timeSpend);
    //  FIX: here we calculated wpm maybe we can put this into type text class
    let wpm = typeText.typeLetters.length / 5 / (timeSpend / 60000);
    wpmResult.innerText = Math.floor(wpm) + " WPM";
  }
});

letterBox.addEventListener("mouseleave", () => {
  console.log("leaving");
});

letterBox.addEventListener("click", () => {
  console.log("click click");
});
