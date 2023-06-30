import { type TrackedWord } from "~/types";

export const determineLetterState = ({
  correctToIndex,
  correctWord,
  currentlyTyped,
  letterIndex,
}: {
  correctWord: string;
  currentlyTyped: string;
  letterIndex: number;
  correctToIndex: number;
}) => {
  if (letterIndex >= correctWord.length) {
    return "excess";
  }

  if (letterIndex >= correctToIndex && letterIndex >= currentlyTyped.length) {
    if (currentlyTyped.length > correctToIndex) {
      if (letterIndex >= currentlyTyped.length) {
        return "untouched";
      }
      return letterIndex > correctToIndex ? "wrong" : "untouched";
    }

    return "untouched";
  }

  if (letterIndex >= correctToIndex) {
    return "wrong";
  }
  if (correctToIndex > letterIndex) {
    return "correct";
  }
  return "untouched";
};

export const getCorrectToIndex = ({
  correct,
  current,
}: {
  correct: string;
  current: string;
}) => {
  if (current.length === correct.length && current.at(-1) === correct.at(-1)) {
    return current.length + 1;
  }
  for (let i = 0; i < correct.length; i++) {
    if (correct[i] !== current[i]) {
      return i;
    }
  }
  return correct.length;
};

export const createTrackedWords = (input: string): TrackedWord[] =>
  input.split(" ").map((input, index) => ({
    correct: input,
    current: "",
    index,
  }));

export const getRandomItem = <T>(myArray: T[]) => {
  return myArray[Math.floor(Math.random() * myArray.length)] as T;
};
