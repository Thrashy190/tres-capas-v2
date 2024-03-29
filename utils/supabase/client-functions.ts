import { supabaseClient } from "@/utils/supabase/client";
import Product from "@/interfaces/product";

async function deleteItem(
  id: number
): Promise<{ status: number; message: string }> {
  const { error } = await supabaseClient.from("product").delete().eq("id", id);

  if (error) {
    return { status: 400, message: error.message };
  }
  return { status: 200, message: "Eliminado con exito" };
}

async function addItem(producto: Product) {
  const { error } = await supabaseClient.from("product").insert(producto);

  if (error) {
    return { status: 400, message: error.message };
  }
  return { status: 200, message: "Agregado con exito" };
}

export { deleteItem, addItem };
