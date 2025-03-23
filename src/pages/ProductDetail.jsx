import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchProductDetail,
  handleAddToCart,
} from "../services/productService";
import Selector from "../components/Selector";
import ProductDescription from "../components/ProductDescription";
import useCartStore from "../stores/cartStore";

function ProductDetail() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  // We import the cart global state
  const { addToCart } = useCartStore();

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const data = await fetchProductDetail(id);
        setProductDetails(data);
        setSelectedStorage(data.options.storages[0].code);
        setSelectedColor(data.options.colors[0].code);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    getProductDetails();
  }, [id]);

  const handleAddCart = async () => {
    if (!productDetails) return;

    const itemInfo = {
      id: productDetails.id,
      colorCode: parseInt(selectedColor),
      storageCode: parseInt(selectedStorage),
    };

    await handleAddToCart(itemInfo);
    addToCart(itemInfo);
  };

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="max-w-6xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className="w-full h-96 rounded-lg shadow-md overflow-hidden">
              <img
                src={productDetails.imgUrl}
                alt={`${productDetails.brand} - ${productDetails.model}`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2">
            {/* Product Title */}
            <h1 className="text-3xl font-bold mb-6">
              {productDetails.brand} - {productDetails.model}
            </h1>

            {/* Price */}
            <h2 className="text-2xl mb-6">
              Precio: <strong>${productDetails.price}</strong>
            </h2>

            {/* Actions Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Opciones:</h2>

              {/* Storage Selector */}
              <div className="mb-6">
                <Selector
                  options={productDetails?.options?.storages}
                  selectedValue={selectedStorage}
                  setSelectedValue={setSelectedStorage}
                  title="Almacenamiento:"
                />
              </div>

              {/* Color Selector */}
              <div className="mb-6">
                <Selector
                  options={productDetails?.options?.colors}
                  selectedValue={selectedColor}
                  setSelectedValue={setSelectedColor}
                  title="Color:"
                />
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddCart}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold cursor-pointer"
              >
                Añadir al carrito
              </button>
            </section>
          </div>
        </div>

        {/* Description Section */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Descripción del producto:
          </h2>
          <ProductDescription productDetails={productDetails} />
        </section>
      </div>
    </div>
  );
}

export default ProductDetail;
