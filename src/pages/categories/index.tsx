import Link from "next/link";
import { DataPageLayout } from "~/components/DataPageLayout";
import { api } from "~/utils/api";

const CategoriesIndexPage = () => {
  const { data: categories } = api.gameRouter.getAllCategories.useQuery();
  return (
    <DataPageLayout>
      <h1 className="text-4xl font-bold">Categories</h1>
      <div className="flex flex-col gap-4">
        {categories?.map((category) => (
          <Link
            className="text-lg font-semibold text-blue-500 hover:text-blue-700"
            href={`/categories/${category.id}`}
            key={category.id}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </DataPageLayout>
  );
};

export default CategoriesIndexPage;
