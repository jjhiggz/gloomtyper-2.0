import { useGameProvider } from "~/providers/GameProvider";

export const InGameStats = () => {
  const { incorrectCount, correctCount, activeGame, timerProps } =
    useGameProvider();
  return (
    <div className="flex h-16 w-full  items-center justify-between bg-slate-300">
      <div>Time: {timerProps.time}</div>
      <div>
        {correctCount + incorrectCount} /{" "}
        {activeGame?.content.split(" ").length}
      </div>
    </div>
  );
};
