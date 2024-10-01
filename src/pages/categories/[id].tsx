import Link from "next/link";
import { useRouter } from "next/router";
import { match, P } from "ts-pattern";
import { DataPageLayout } from "~/components/DataPageLayout";
import { LoadingSpinner } from "~/components/LoadingWheel";
import { api } from "~/utils/api";

const CategoryShowPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: category } = api.gameRouter.getCategory.useQuery(id as string);

  return (
    <DataPageLayout>
      {match(category)
        .with(P.nullish, () => (
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <div className="h-10 w-3/4 animate-pulse rounded bg-gray-300"></div>
            <LoadingSpinner />
          </div>
        ))
        .with(P.not(P.nullish), (category) => (
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <h1 className="text-center text-4xl">
              <b>Category: </b> {category.name}
            </h1>
            <div className="flex flex-col gap-4 px-48">
              {category.quotes.map((quote) => (
                <div
                  key={quote.id}
                  className="flex flex-col gap-2 rounded-md border-2 border-slate-300 p-4 text-center"
                >
                  <Link href={`/quotes/${quote.id}`}>
                    <p className="text-xl font-bold text-blue-400 underline hover:text-blue-500">
                      <b>Quote: </b>
                      {quote.name}
                    </p>
                  </Link>

                  <Link href={`/authors/${quote.author.id}`}>
                    <p className="text-xl font-bold text-blue-400 underline hover:text-blue-500">
                      <b>By: </b>
                      {quote.author.name}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))
        .exhaustive()}
    </DataPageLayout>
  );
  //   if (isLoading) {
  //     return <LoadingSpinner />;
  //   }

  //   return <div>Category {category?.name}</div>;
};

export default CategoryShowPage;
