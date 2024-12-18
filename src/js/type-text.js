import { TextStatus } from "./enums.js";
import { TypeLetter } from "./letter.js";

export class TypeText {
  constructor(text) {
    console.log("making new type text");
    this.text = text;
    this.status = TextStatus.WAITING;
    this.typeLetters = [];
    this.typeLetters = text.split("").map((letter) => new TypeLetter(letter));
    this.letterPointer = 0;
    this.currentLetter = this.typeLetters[this.letterPointer];
    this.startTime;
    this.endTime;
  }

  startTimer() {
    const time = (this.startTime = new Date().getTime());
    return time;
  }

  endTimer() {
    const time = (this.endTime = new Date().getTime());
    return time;
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
