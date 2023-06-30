export const Letter = ({
  value,
  status,
}: {
  value: string;
  status: "correct" | "untouched" | "wrong" | "excess";
}) => {
  const className = (() => {
    if (status === "correct") {
      return "text-green-400";
    }
    if (status === "excess") {
      return "text-red-600";
    }
    if (status === "untouched") {
      return "text-white";
    }
    if (status === "wrong") {
      return "text-red-500";
    }
  })();
  return <span className={className}>{value}</span>;
};
