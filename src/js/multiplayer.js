import { BACKEND_URL } from "./secret.js";
import { LOCALSTORAGE_USERNAME } from "./constants.js";
import { LetterStatus } from "./enums.js";
import { TypeText } from "./type-text.js";

const usernameDiv = document.getElementById("username-div");
const wpmResult = document.getElementById("wpm-result");
const gameDiv = document.getElementById("letters-box");

localStorage.debug = "socket.io-client:socket";

const socket = io(BACKEND_URL, {
  query: {
    username: localStorage.getItem(LOCALSTORAGE_USERNAME),
  },
});
socket.on("connect", () => {
  console.log("connected: ", socket.id);
  // volatile opcija je super jer u slucaju da nema connection-a na
  // sekund server ce dobiti samo zadnji letterPointer (dok je server
  // ugasen dogodi se discard emit letterPointer-e koji nisi stigli)
  // TODO: ova socket logika radi, refactor imena i kreni raditi na frontendu.
  // ovaj emit slati ce wpm position clienta
});

socket.on("full room", (data) => {
  data.usernames.forEach((username) => {
    const usernameP = document.createElement("p");
    usernameP.innerText = username;
    usernameDiv.appendChild(usernameP);
  });
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
      socket.volatile.emit("wpmPosition", {
        username: localStorage.getItem(LOCALSTORAGE_USERNAME),
        position: typeText.letterPointer,
      });
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

  socket.on("letterPosition", (data) => {
    typeText.updateOpponentCaret(data);
    console.log(data);
  });
}
