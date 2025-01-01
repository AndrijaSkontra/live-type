import { BACKEND_URL } from "./secret.js";

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
  socket.volatile.emit("event2", "hello" + socket.id + " math ran: " + rndNum);
});

socket.on("letter", (data) => {
  console.log(data);
});
