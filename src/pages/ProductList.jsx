import React, { useEffect, useState } from "react";
//import { fetchProducts } from "../services/productService";
import { testData } from "../assets/testAPI";
import ProductItem from "../components/ProductItem";
function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        //const data = await fetchProducts(); temporally commented to not make too many requests to the API while development
        setProducts(testData.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  return (
    <main className="p-7">
      <h2 className="mb-5">Product List</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {products.map((product) => (
          <li
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <ProductItem product={product} />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default ProductList;
