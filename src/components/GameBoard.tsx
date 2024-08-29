import { Word } from "./Word";
import { useGameProvider } from "~/providers/GameProvider";
import { GameStats } from "./GameStats";
import { NoGameBoard } from "./NoGameBoard";

export const GameBoard = () => {
  const {
    activeGame,
    inputRef,
    trackedWords,
    inputState,
    inputHandler,
    wordIndex,
  } = useGameProvider();

  return (
    <div className="mt-10 w-full">
      <h1 className="h-10 text-center text-2xl">{activeGame?.name ?? ""}</h1>

      <div className="flex h-80 w-full flex-col justify-start rounded-2xl bg-slate-100 text-center font-mono text-2xl text-slate-500">
        {activeGame && <GameStats />}
        {activeGame && (
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
        )}

        {!activeGame && <NoGameBoard />}
      </div>

      <input
        type="text"
        className="w-0"
        value={inputState}
        onChange={inputHandler}
        ref={inputRef}
      />
    </div>
  );
};
