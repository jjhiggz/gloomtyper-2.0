import {
  type ChangeEventHandler,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from "react";
import { useSampler } from "~/hooks/useSampler";
import { type TrackedWord } from "~/types";
import { createTrackedWords, getRandomItem } from "~/utils/typing-test-utils";
import { Word } from "./Word";
import { usePlayer } from "~/hooks/usePlayer";
import { type GameText } from "@prisma/client";

export const GameBoard = ({
  setCorrectCount,
  setIncorrectCount,
  gameText,
}: {
  setCorrectCount: Dispatch<SetStateAction<number>>;
  setIncorrectCount: Dispatch<SetStateAction<number>>;
  gameText: GameText;
}) => {
  const sampler = useSampler();
  const player = usePlayer();

  const [wordIndex, setWordIndex] = useState(0);
  const [inputState, setInputState] = useState("");
  const [trackedWords, setTrackedWords] = useState<TrackedWord[]>(
    createTrackedWords(gameText.content)
  );

  useEffect(() => {
    if (wordIndex === 1) {
      player?.start();
    }
    if (wordIndex === trackedWords.length) {
      player?.stop();
    }
  }, [wordIndex]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  const inputHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const lastKey = e.target.value.at(-1);

    if (lastKey === " ") {
      const trackedWord = trackedWords[wordIndex];
      sampler?.triggerAttack("C5");
      if (trackedWord?.correct !== trackedWord?.current) {
        setIncorrectCount((incorrectCount) => incorrectCount + 1);
      } else {
        setCorrectCount((correctCount) => correctCount + 1);
      }

      setWordIndex(wordIndex + 1);
      setInputState("");
      return;
    }

    const key = getRandomItem(["C1", "C2", "C3"]);
    sampler?.triggerAttack(key);
    setInputState(e.target.value);
    setTrackedWords(
      trackedWords.map((trackedWord, trackedWordIndex) => {
        if (trackedWordIndex !== wordIndex) {
          return trackedWord;
        }
        return { ...trackedWord, current: e.target.value };
      })
    );
  };
  return (
    <>
      <h1>{gameText.name}</h1>
      <div
        id="game-container"
        className="flex h-44 w-full flex-wrap items-start bg-slate-800 p-3 text-xl text-slate-200"
        onClick={() => {
          inputRef.current?.focus();
        }}
      >
        {trackedWords.map((_word, index) => (
          <Word
            key={index}
            index={index}
            activeIndex={wordIndex}
            trackedWords={trackedWords}
          />
        ))}
      </div>

      <input
        type="text"
        className="w-0"
        value={inputState}
        onChange={inputHandler}
        ref={inputRef}
      />
    </>
  );
};
