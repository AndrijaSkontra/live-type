import { TextStatus } from "./enums.js";
import { TypeLetter } from "./letter.js";

export class TypeText {
  constructor(text) {
    this.text = text;
    this.status = TextStatus.WAITING;
    this.typeLetters = [];
    this.typeLetters = text.split("").map((letter) => new TypeLetter(letter));
    this.letterPointer = 0;
    this.currentLetter = this.typeLetters[this.letterPointer];
    this.startTime;
    this.endTime;
    this.timerStarted;
    this.typingStarted = false;
  }

  paintLetters() {
    const parentElement = document.getElementById("letters");
    parentElement.innerHTML = "";
    this.typeLetters.forEach((elem) => {
      elem.paintToDOM();
    });
  }

  borderAroundCurrentLetter() {
    this.currentLetter.removeBorder();
    this.currentLetter = this.typeLetters[this.letterPointer];
  }

  setTimerStarted(x) {
    this.timerStarted = x;
  }

  startTimer() {
    this.startTime = new Date().getTime();
  }

  endTimer() {
    this.endTime = new Date().getTime();
  }

  getCurrentLetter() {
    return this.typeLetters[this.letterPointer];
  }

  nextLetter() {
    this.letterPointer = this.letterPointer + 1;
  }

  isCompleted() {
    return this.letterPointer === this.typeLetters.length;
  }
}
