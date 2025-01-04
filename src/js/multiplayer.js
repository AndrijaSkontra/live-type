import { BACKEND_URL } from "./secret.js";
import { LetterStatus } from "./enums.js";
import { TypeText } from "./type-text.js";

const wpmResult = document.getElementById("wpm-result");
const gameDiv = document.getElementById("letters-box");

localStorage.debug = "socket.io-client:socket";

const rndNum = Math.random();
console.log("generated: ", rndNum);

const socket = io(BACKEND_URL);
socket.on("connect", () => {
  console.log("connected: ", socket.id);
  // volatile opcija je super jer u slucaju da nema connection-a na
  // sekund server ce dobiti samo zadnji letterPointer (dok je server
  // ugasen dogodi se discard emit letterPointer-e koji nisi stigli)
  // TODO: ova socket logika radi, refactor imena i kreni raditi na frontendu.
  // ovaj emit slati ce wpm position clienta
});

socket.on("letterPosition", (data) => {
  console.log(data);
});

socket.on("full room", (data) => {
  const countdown = document.createElement("p");
  countdown.id = "countdown";
  gameDiv.appendChild(countdown);

  let seconds = 4;

  const intervalId = setInterval(() => {
    seconds--;
    countdown.innerText = seconds;

    if (seconds === 0) {
      clearInterval(intervalId);
      gameDiv.removeChild(countdown);
      startTheMultiplayerGame(data.words);
    }
  }, 1000);
});

function startTheMultiplayerGame(words) {
  let typeText = new TypeText(words);
  typeText.paintLetters("letters");

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
      socket.volatile.emit(
        "wpmPosition",
        "username: " + socket.id + " | letter pos: " + typeText.letterPointer,
      );
    } else {
      currentLetter.status = LetterStatus.MISS;
      currentLetter.changeColor();
    }
    if (typeText.isCompleted()) {
      typeText.endTimer();
      const timeSpend = typeText.endTime - typeText.startTime;

      const wpm = typeText.typeLetters.length / 5 / (timeSpend / 60000);
      const wpmFinal = Math.floor(wpm);
      wpmResult.innerText = wpmFinal + " WPM";
    }
  });
}
