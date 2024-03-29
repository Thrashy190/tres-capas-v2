import { supabase } from "@/utils/supabase/server";
import Product from "@/interfaces/product";

async function getItems(): Promise<Product[]> {
  const { data, error } = await supabase.from("product").select();

  if (error) {
    console.log(error.message);
    return [];
  }

  console.log(data);
  return data;
}

async function searchItem(search: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from("product")
    .select()
    .like("name", `%${search}%`);

  if (error) {
    return [];
  }
  return data;
}

export { getItems, searchItem };
