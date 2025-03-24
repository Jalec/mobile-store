import React, { useEffect, useState, useRef, useCallback } from "react";
import { fetchProducts } from "../services/productService";
import ProductItem from "../components/ProductItem";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";

function ProductList() {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]); // Products currently displayed
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const productsPerPage = 10;

  // Fetch all products
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setAllProducts(data);
        setDisplayedProducts(data.slice(0, productsPerPage)); // Display the first chunk
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  // Filter products based on search query
  useEffect(() => {
    const filtered = allProducts.filter(
      (product) =>
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.model.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDisplayedProducts(filtered.slice(0, page * productsPerPage));
    setHasMore(filtered.length > page * productsPerPage);
  }, [searchQuery, allProducts, page]);

  // Infinite scroll
  const lastProductRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  return (
    <main className="flex flex-col gap-4 p-7">
      <SearchBar setSearchQuery={setSearchQuery} />
      {displayedProducts.length === 0 ? (
        <div className="flex justify-center mb-12">
          <ClimbingBoxLoader size={32} />
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {displayedProducts.map((product, index) => {
            if (displayedProducts.length === index + 1) {
              return (
                <li
                  key={product.id}
                  ref={lastProductRef}
                  className="bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden"
                >
                  <Link
                    to={`/product/${product.id}`}
                    alt={`${product.brand} - ${product.model}`}
                  >
                    <ProductItem product={product} />
                  </Link>
                </li>
              );
            } else {
              return (
                <li
                  key={product.id}
                  className="bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden"
                >
                  <Link
                    to={`/product/${product.id}`}
                    alt={`${product.brand} - ${product.model}`}
                  >
                    <ProductItem product={product} />
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      )}

      {!hasMore && (
        <p className="text-center text-gray-500">No more products to load.</p>
      )}
    </main>
  );
}

export default ProductList;
