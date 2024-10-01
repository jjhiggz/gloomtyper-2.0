import { useRouter } from "next/router";

export const NavHeader = ({
  showBackButton = true,
}: {
  showBackButton?: boolean;
}) => {
  const router = useRouter();
  return (
    <header className="mt-2 flex h-16 w-full items-center justify-between rounded-lg  bg-slate-200 px-10">
      {showBackButton && (
        <button
          className="flex h-full items-center self-start text-blue-500 underline hover:text-blue-700"
          onClick={() => router.back()}
        >
          Back
        </button>
      )}
      {!showBackButton && <div></div>}
      <nav className="flex gap-4">
        <button
          className="text-xl "
          onClick={() => {
            router.push("/").catch(console.error);
          }}
        >
          🏠
        </button>
        <button
          className="text-blue-500 underline hover:text-blue-700"
          onClick={() => {
            router.push("/categories").catch(console.error);
          }}
        >
          Categories
        </button>
        <button
          className="text-blue-500 underline hover:text-blue-700"
          onClick={() => {
            router.push("/authors").catch(console.error);
          }}
        >
          Authors
        </button>
        <button
          className="text-blue-500 underline hover:text-blue-700"
          onClick={() => {
            router.push("/quotes").catch(console.error);
          }}
        >
          Quotes
        </button>
      </nav>
    </header>
  );
};
export const DataPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="m-0 flex min-h-screen flex-col items-center justify-start gap-4 bg-white px-24 py-2">
      <NavHeader />
      {children}
    </div>
  );
};
