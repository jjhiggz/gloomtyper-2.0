export const ContentBox = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => (
  <div className="flex w-full flex-col items-center gap-2 px-32">
    <h3 className="text-2xl underline">{title}</h3>
    <div className="flex  h-48 w-3/4 flex-wrap items-start gap-4 border border-slate-700 p-5">
      {children}
    </div>
  </div>
);
