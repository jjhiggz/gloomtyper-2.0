import { type ChangeEventHandler, useRef, useState, useEffect } from "react";
import { useSampler } from "~/hooks/useSampler";
import { type TrackedWord } from "~/types";
import { createTrackedWords, getRandomItem } from "~/utils/typing-test-utils";
import { Word } from "./Word";
import { usePlayer } from "~/hooks/usePlayer";
import { useGameProvider } from "~/providers/GameProvider";

export const GameBoard = () => {
  const { setCorrectCount, setIncorrectCount, activeGame } = useGameProvider();

  const sampler = useSampler();
  const player = usePlayer();

  const [wordIndex, setWordIndex] = useState(0);
  const [inputState, setInputState] = useState("");
  const [trackedWords, setTrackedWords] = useState<TrackedWord[]>([]);

  useEffect(() => {
    if (wordIndex === 1) {
      player?.start();
    }
    if (wordIndex === trackedWords.length) {
      player?.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordIndex]);

  useEffect(() => {
    if (activeGame) inputRef.current?.focus();
  }, [activeGame]);

  useEffect(() => {
    if (activeGame) setTrackedWords(createTrackedWords(activeGame.content));
    else setTrackedWords([]);
  }, [activeGame]);

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
  if (!activeGame) return <></>;

  return (
    <>
      <h1>{activeGame.name}</h1>
      <div
        id="game-container"
        className="flex  w-full flex-wrap items-start bg-transparent p-3 py-8 text-xl text-slate-900"
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
