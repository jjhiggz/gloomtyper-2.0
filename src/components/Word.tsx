import { type TrackedWord } from "~/types";
import {
  determineLetterState,
  getCorrectToIndex,
} from "~/utils/typing-test-utils";
import { Letter } from "./Letter";

export const Word = ({
  index,
  activeIndex,
  trackedWords,
}: {
  index: number;
  activeIndex: number;
  trackedWords: TrackedWord[];
}) => {
  const isActive = index === activeIndex;
  // const isActive = false;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const trackedWord = trackedWords[index]!;

  const correctToIndex = getCorrectToIndex({
    correct: trackedWord.correct,
    current: trackedWord.current,
  });

  if (index === activeIndex) {
    console.log({ ...trackedWord });
  }
  const renderWord = `${trackedWord.current}${trackedWord.correct.slice(
    trackedWord.current.length
  )}`;

  return (
    <div className={`mr-2 h-5 ${isActive ? "bg-slate-600" : ""}`}>
      {renderWord.split("").map((letter, letterIndex) => {
        const letterState = determineLetterState({
          correctToIndex,
          correctWord: trackedWord.correct,
          currentlyTyped: trackedWord.current,
          letterIndex,
        });
        return <Letter key={letterIndex} value={letter} status={letterState} />;
      })}
    </div>
  );
};
