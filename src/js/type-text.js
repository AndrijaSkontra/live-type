import { TextStatus } from "./enums.js";
import { TypeLetter } from "./letter.js";

export class TypeText {
  constructor(text) {
    this.text = text;
    this.status = TextStatus.WAITING;
    this.typeLetters = [];
    this.typeLetters = text.split("").map((letter) => new TypeLetter(letter));
  }
}
