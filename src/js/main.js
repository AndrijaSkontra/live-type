import { TypeText } from "./type-text.js";
const typerText = document.getElementById("typer-text");
const typingText = document.getElementById("typing-text");
const restartButton = document.getElementById("restart-button");
const wpmResult = document.getElementById("wpm-result");
let wpm;

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

const typerTextFromDB = await getWords();

console.log(typerTextFromDB);
typerText.innerText = typerTextFromDB;
let typerTextValue = typerText.innerText;
let startedTime;

typingText.addEventListener("focus", (event) => {
  event.target.style.background = "hsl(360 100% 95%)";
  startedTime = new Date().getTime();
});

typingText.addEventListener("blur", (event) => {
  event.target.style.background = "white";
});

typingText.addEventListener("input", (e) => {
  if (e.target.value === typerText.innerText) {
    wpm =
      typerTextValue.length /
      5 /
      ((new Date().getTime() - startedTime) / 60000);
    wpmResult.innerText = Math.floor(wpm) + " WPM";
    typingText.style.background = "hsl(154 100% 97%)";
  }
});

restartButton.addEventListener("click", async (e) => {
  typingText.value = "";
  wpmResult.innerText = "";
  typerText.innerText = await getWords();
});

const typeText = new TypeText(await getWords());

//  TODO:
//  todo stavi svako slovo na ekran, ovaj dio probati bez react-a
//  onda bi se mogli prebaciti na react...
typeText.typeLetters.forEach((elem) => {
  console.log(elem.getString());
});
