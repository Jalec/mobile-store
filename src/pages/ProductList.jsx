import React, { useEffect, useState } from "react";
//import { fetchProducts } from "../services/productService";
import { testData } from "../assets/testAPI";
import ProductItem from "../components/ProductItem";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        //const data = await fetchProducts(); temporally commented to not make too many requests to the API while development
        setProducts(testData.products);
        setFilteredProducts(testData.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.model.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  return (
    <main className="flex flex-col gap-4 p-7">
      <SearchBar setSearchQuery={setSearchQuery} />
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {filteredProducts.map((product) => (
          <li
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <Link
              to={`/product/${product.id}`}
              alt={`${product.brand} - ${product.model}`}
            >
              <ProductItem product={product} />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default ProductList;
