import { LetterStatus } from "../src/js/enums";

test("Ensure status WAITING is not equal to HIT", () => {
  expect(LetterStatus.WAITING !== LetterStatus.HIT).toBe(true);
});
