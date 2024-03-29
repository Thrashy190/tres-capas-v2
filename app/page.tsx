import { getItems, searchItem } from "@/utils/supabase/functions";
import Table from "@/components/Table";

export default async function Products({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | undefined };
}) {
  const products = await searchItem(searchParams?.name || "");

  if (!products) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className="flex items-center p-12">
      <Table products={products} />
    </main>
  );
}
