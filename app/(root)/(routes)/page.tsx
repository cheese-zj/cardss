import { SearchInput } from "@/components/search-input";
import prismadb from "@/lib/prismadb";
import { Categories } from "@/components/categories";
import { CC } from "@/components/cards";

interface RootPageProps {
  searchParams: {
    category: string;
    name: string;
  }
}

const RootPage = async (
  {searchParams}: RootPageProps
) => {

  const data = await prismadb.card.findMany({
    where: {
      name: {
        contains: searchParams.name,
      }
    }
  });

  const categories = await prismadb.category.findMany();
  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories data={categories} />
      <CC data={data} />
    </div>
  );
}

export default RootPage;