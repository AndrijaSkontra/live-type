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

  paintToDOM(parentElementId = "letters") {
    if (this.value === " ") {
      this.letterElement.innerText = "\u00A0";
    } else {
      this.letterElement.innerText = this.value;
    }
    const parentElement = document.getElementById(parentElementId);
    parentElement.appendChild(this.letterElement);
  }

  removeBorder() {
    this.letterElement.classList.remove("current-letter-hit");
    this.letterElement.classList.remove("current-letter-miss");
  }

  /**
   * Apply css based on hit or miss or whitespace
   */
  changeColor() {
    if (this.value !== " ") {
      if (this.status === LetterStatus.HIT) {
        this.letterElement.classList.add("current-letter-hit");
        this.letterElement.classList.remove("current-letter-miss");
        this.letterElement.id = "letter-hit";
      } else if (this.status === LetterStatus.MISS) {
        this.letterElement.classList.add("current-letter-miss");
        this.letterElement.classList.remove("current-letter-hit");
        this.letterElement.id = "letter-miss";
      }
    } else {
      if (this.status === LetterStatus.HIT) {
        this.letterElement.classList.add("current-letter-hit");
        this.letterElement.classList.remove("current-letter-miss");
        this.letterElement.id = "letter-whitespace-hit";
      }
      if (this.status === LetterStatus.MISS) {
        this.letterElement.classList.add("current-letter-miss");
        this.letterElement.classList.remove("current-letter-hit");
        this.letterElement.id = "letter-whitespace-miss";
      }
    }
  }

  makePink() {
    this.letterElement.classList.add("opponent");
  }

  removePink() {
    this.letterElement.classList.remove("opponent");
  }
}
