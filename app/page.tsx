"use client";

import { searchItem } from "@/utils/supabase/functions";
import { useEffect, useState } from "react";
import Table from "@/components/Table";

export default function Products({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | undefined };
}) {
  const [products, setProducts] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await searchItem(searchParams?.name || "");
      setProducts(response);
    };

    fetchProducts();
  }, [searchParams]);

  if (!products) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className="flex items-center p-12">
      <Table products={products} />
    </main>
  );
}
