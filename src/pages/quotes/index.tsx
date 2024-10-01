import Link from "next/link";
import { DataPageLayout } from "~/components/DataPageLayout";
import { api } from "~/utils/api";

const QuotesIndexPage = () => {
  const { data: quotes } = api.gameRouter.getAllQuotes.useQuery();

  return (
    <DataPageLayout>
      <h1 className="text-4xl font-bold">Quotes</h1>
      <div className="flex flex-col gap-4">
        {quotes?.map((quote) => (
          <Link
            className="text-lg font-semibold text-blue-500 hover:text-blue-700"
            href={`/quotes/${quote.id}`}
            key={quote.id}
          >
            {quote.name}
          </Link>
        ))}
      </div>
    </DataPageLayout>
  );
};

export default QuotesIndexPage;
