import PuroksTable from "@/components/user/puroks/table";
import SearchBar from "@/components/search-bar";

export default function Services({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const searchQuery = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  return (
    <div className="container max-w-screen-md mx-auto">
      <h1 className="text-center text-2xl">Puroks</h1>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <SearchBar />
        </div>
        <div className="mt-2">
          <PuroksTable searchQuery={searchQuery} page={page} />
        </div>
      </div>
    </div>
  );
}
