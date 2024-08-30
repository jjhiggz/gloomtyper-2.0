import { useGameProvider } from "~/providers/GameProvider";

export const FinishedGameBoard = () => {
  const { timerProps, correctCount, incorrectCount } = useGameProvider();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-slate-900">
      <h1 className="">Time: {timerProps.time}s</h1>
      <h1 className="">
        Accuracy:{" "}
        {Math.round((correctCount / (incorrectCount + correctCount)) * 100)}%
      </h1>
      <h1 className="">
        WPM: {Math.round((correctCount / timerProps.time) * 60)}
      </h1>
      <h1 className="">Correct: {correctCount}</h1>
      <h1 className="">Incorrect: {incorrectCount}</h1>
    </div>
  );
};
