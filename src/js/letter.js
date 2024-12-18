import { LetterStatus } from "./enums.js";

export class TypeLetter {
  constructor(value) {
    this.value = value;
    this.status = LetterStatus.WAITING;
    this.letterElement = document.createElement("p");
  }

  getString() {
    return `Letter: ${this.value} - Status: ${this.status}`;
  }

  paintToDOM() {
    if (this.value === " ") {
      this.letterElement.innerText = "\u00A0";
    } else {
      this.letterElement.innerText = this.value;
    }
    const parentElement = document.getElementById("letters");
    parentElement.appendChild(this.letterElement);
  }

  changeID() {
    if (this.status === LetterStatus.HIT) {
      this.letterElement.id = "letter-hit";
    }
    if (this.status === LetterStatus.MISS) {
      this.letterElement.id = "letter-miss";
    }
  }
}
