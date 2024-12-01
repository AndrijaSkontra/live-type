const typerText = document.getElementById("typer-text");
const typingText = document.getElementById("typing-text");
const restartButton = document.getElementById("restart-button");
const wpmResult = document.getElementById("wpm-result");
let wpm;

let typerTextValue = typerText.innerText;
let startedTime;

typingText.addEventListener("focus", (event) => {
  event.target.style.background = "pink";
  startedTime = new Date().getTime();
});

typingText.addEventListener("blur", (event) => {
  event.target.style.background = "white";
});

typingText.addEventListener("input", (e) => {
  if (e.target.value === typerTextValue) {
    wpm =
      typerTextValue.length /
      5 /
      ((new Date().getTime() - startedTime) / 60000);
    wpmResult.innerText = Math.floor(wpm) + " WPM";
  }
});

restartButton.addEventListener("click", (e) => {
  typingText.value = "";
  wpmResult.innerText = "";
});
