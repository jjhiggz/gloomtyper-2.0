import { useRouter } from "next/router";

export const DataPageLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-4 bg-gray-100 py-2">
      <header className="flex w-full justify-between px-10">
        <button
          className="flex items-center self-start text-blue-500 underline hover:text-blue-700"
          onClick={() => router.back()}
        >
          Back
        </button>
      </header>
      {children}
    </div>
  );
};
