export const GameStats = ({
  correctCount,
  incorrectCount,
}: {
  correctCount: number;
  incorrectCount: number;
}) => {
  return (
    <div className="flex  h-28 w-full items-center justify-between bg-amber-600 px-10 text-white">
      <h3 className="text-3xl">Game Stats</h3>
      <div className="flex flex-col bg-slate-500 px-5 py-2">
        <div>
          <b className="mr-2">Total:</b>
          {correctCount + incorrectCount}
        </div>
        <div>
          <b className="mr-2">Wrong:</b>
          {incorrectCount}
        </div>
        <div>
          <b className="mr-2">Accuracy:</b>
          {Math.round((correctCount / (incorrectCount + correctCount)) * 100)}%
        </div>
      </div>
    </div>
  );
};
