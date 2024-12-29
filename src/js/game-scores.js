import { BACKEND_URL } from "./secret.js";

const gameScoreTable = document.getElementById("game-score-table");

const res = fetch(`${BACKEND_URL}/game-scores`).then((res) => {
  console.log("fetch on scores status: ", res.status);
  if (res.status === 200) {
    return res.json();
  }
});

const gameScores = await res;
console.log(gameScores);

gameScores.forEach((gameScore) => {
  const tableRow = document.createElement("tr");
  const rowWpm = document.createElement("td");
  rowWpm.innerText = gameScore.wpm;
  const rowUsername = document.createElement("td");
  rowUsername.innerText = gameScore.username;
  tableRow.appendChild(rowUsername);
  tableRow.appendChild(rowWpm);
  gameScoreTable.appendChild(tableRow);
});
