import { LetterStatus } from "./enums.js";

export class TypeLetter {
  constructor(value) {
    this.value = value;
    this.status = LetterStatus.WAITING;
  }

  getString() {
    return `Letter: ${this.value} - Status: ${this.status}`;
  }
}
