import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();

  const isProductPage = location.pathname.startsWith("/product/");

  return (
    <nav aria-label="breadcrumb" className="ml-4 p-2 text-sm text-gray-600">
      <ol className="flex space-x-2">
        <li>
          <Link to="/" className="hover:text-gray-900">
            Home
          </Link>
        </li>
        {isProductPage && (
          <>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-gray-900">Product Details</span>
            </li>
          </>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
