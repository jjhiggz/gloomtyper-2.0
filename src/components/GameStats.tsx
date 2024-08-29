import { useGameProvider } from "~/providers/GameProvider";

export const GameStats = () => {
  const { incorrectCount, correctCount, activeGame } = useGameProvider();
  return (
    <div className="flex h-16 w-full  flex-col items-center justify-center bg-slate-300">
      <div>
        {correctCount + incorrectCount} /{" "}
        {activeGame?.content.split(" ").length}
      </div>
    </div>
  );
};
