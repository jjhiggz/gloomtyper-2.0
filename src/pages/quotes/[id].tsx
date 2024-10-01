import Link from "next/link";
import { useRouter } from "next/router";
import { match, P } from "ts-pattern";
import { ContentBox } from "~/components/ContentBox";
import { DataPageLayout } from "~/components/DataPageLayout";
import { LoadingSpinner } from "~/components/LoadingWheel";
import { abbreviate } from "~/utils/abbreviate-text";
import { api } from "~/utils/api";

const CategoryShowPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: quote } = api.gameRouter.getQuote.useQuery(id as string);

  return (
    <DataPageLayout>
      {match(quote)
        .with(P.nullish, () => (
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <div className="h-10 w-3/4 animate-pulse rounded bg-gray-300"></div>
            <LoadingSpinner />
          </div>
        ))
        .with(P.not(P.nullish), (quote) => (
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <h1 className="text-center text-4xl">
              <b>Quote: </b> {quote.name}
            </h1>
            <h2 className="text-center text-2xl">
              <b>Author: </b>{" "}
              <Link
                href={`/authors/${quote.author.id}`}
                className="text-blue-500 underline"
              >
                {quote.author.name}
              </Link>
            </h2>
            <p className="px-20 italic">{quote.content}</p>
            <ContentBox title="Categories For This Quote">
              {quote?.categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className=" flex h-10 items-center justify-center rounded bg-blue-100 px-2.5 py-0.5 text-sm font-semibold text-blue-800"
                >
                  {category.name.length > 10
                    ? abbreviate(category.name, 10)
                    : category.name}
                </Link>
              ))}
            </ContentBox>
          </div>
        ))
        .exhaustive()}
    </DataPageLayout>
  );
};

export default CategoryShowPage;
