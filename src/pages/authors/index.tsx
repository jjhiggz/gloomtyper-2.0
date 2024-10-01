import Link from "next/link";
import { DataPageLayout } from "~/components/DataPageLayout";
import { api } from "~/utils/api";

const AuthorsIndexPage = () => {
  const { data: authors } = api.gameRouter.getAllAuthors.useQuery();

  return (
    <DataPageLayout>
      <h1 className="text-4xl font-bold">Authors</h1>
      <div className="flex flex-col gap-4">
        {authors?.map((author) => (
          <Link
            className="text-lg font-semibold text-blue-500 hover:text-blue-700"
            href={`/authors/${author.id}`}
            key={author.id}
          >
            {author.name}
          </Link>
        ))}
      </div>
    </DataPageLayout>
  );
};

export default AuthorsIndexPage;
