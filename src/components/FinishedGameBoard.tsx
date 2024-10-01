import Link from "next/link";
import { useGameProvider } from "~/providers/GameProvider";
import { api } from "~/utils/api";

export const FinishedGameBoard = () => {
  const { timerProps, correctCount, incorrectCount, activeGame } =
    useGameProvider();
  const { data: quote } = api.gameRouter.getQuote.useQuery(activeGame?.id);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-slate-900">
      <div>
        <b>Time:</b> {timerProps.time}s
      </div>
      <div>
        <b>Accuracy:</b>{" "}
        {Math.round((correctCount / (incorrectCount + correctCount)) * 100)}%
      </div>
      <div>
        <b>WPM:</b> {Math.round((correctCount / timerProps.time) * 60)}
      </div>
      <div>
        <b>Correct:</b> {correctCount}
      </div>
      <div>
        <b>Incorrect:</b> {incorrectCount}
      </div>
      <div className="flex gap-2">
        <b>Author:</b>
        <Link
          href={`/authors/${quote?.author.id ?? ""}`}
          className="flex items-center text-base text-blue-500 underline"
        >
          {quote?.author.name}
        </Link>
      </div>
      <div className="flex  gap-2">
        <b>Categories:</b>
        {quote?.categories.map((category) => (
          <Link
            href={`/categories/${category.id}`}
            key={category.id}
            className="mr-2 flex items-center justify-center rounded bg-blue-100 px-2.5 py-0.5 text-sm font-semibold text-blue-800"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
