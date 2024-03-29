"use client";
import { useState } from "react";
import { addItem, deleteItem } from "@/utils/supabase/client-functions";
import Product from "@/interfaces/product";
import { useRouter } from "next/navigation";

export default function Table({ products }: { products: any[] }) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const router = useRouter();

  const onClickRowSelectProduct = (product: Product) => {
    setName(product.name);
    setBrand(product.brand);
    setPrice(product.price.toString());
    setId((product.id && product.id.toString()) || "");
    setDescription(product.description);
  };

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    switch (id) {
      case "name":
        // code to update the route param "?name=value" on nextjs
        router.push(`/?name=${value}`);
        setName(value);
        break;
      case "brand":
        setBrand(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }
  };

  const handleAddItem = async () => {
    const product: Product = {
      name,
      brand,
      price: parseInt(price),
      description,
    };

    const response = await addItem(product);

    if (response.status === 200) {
      router.push(`/?name=`);
      console.log(response.message);
    } else {
      console.log(response.message);
    }
  };

  const handleDeleteItem = async (id: number) => {
    const response = await deleteItem(id);

    if (response.status === 200) {
      products = [...products.filter((product) => product.id !== id)];
      router.refresh();
      console.log(response.message);
    } else {
      console.log(response.message);
    }
  };

  return (
    <div className="lg:grid lg:grid-cols-12 flex flex-col-reverse gap-10">
      <div className="lg:col-span-10 grid gap-10">
        <div className="flex flex-col gap-2">
          <div className="w-full flex gap-2">
            <input
              type="text"
              id="id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ID"
              value={id}
              required
              disabled
            />
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nombre"
              value={name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              id="brand"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Marca"
              value={brand}
              onChange={handleInputChange}
              required
            />

            <input
              type="text"
              id="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Precio"
              value={price}
              onChange={handleInputChange}
              required
            />
          </div>
          <textarea
            id="description"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Descripcion"
            value={description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <h1 className="text-2xl text-white">Productos</h1>
        <div className="w-full">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Descripcion
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Marca
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Preciosa
                  </th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product: any) => (
                    <tr
                      key={product.id}
                      onClick={() => onClickRowSelectProduct(product)}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:border-gray-700"
                    >
                      <td className="px-3 py-4 whitespace-nowrap dark:text-white">
                        {product.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                        {product.name}
                      </td>
                      <td className="px-6 py-4">{product.description}</td>
                      <td className="px-6 py-4">{product.brand}</td>
                      <td className="px-6 py-4">{product.price}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="w-full">
        <button
          onClick={handleAddItem}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Agregar
        </button>

        <button
          onClick={() => handleDeleteItem(parseInt(id))}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Borrar
        </button>
      </div>
    </div>
  );
}
