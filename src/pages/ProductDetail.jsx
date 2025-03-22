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
    <div className="p-7">
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        {/* Product Image */}
        <div className="flex justify-center w-full md:w-1/4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <img
            src={productDetails.imgUrl}
            alt={`${productDetails.brand} - ${productDetails.model}`}
            className="w-64 h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/4 rounded-lg ">
          <h1 className="text-3xl font-bold mb-4">
            {productDetails.brand} - {productDetails.model}
          </h1>

          {/* Description Section */}
          <section className="mb-8">
            <h2 className="text-l font-semibold mb-4">
              Descripción del producto:
            </h2>
            <ProductDescription productDetails={productDetails} />
          </section>

          {/* Actions Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Opciones:</h2>
            <div className="flex flex-col gap-4 mb-4">
              <Selector
                options={productDetails?.options?.storages}
                selectedValue={selectedStorage}
                setSelectedValue={setSelectedStorage}
                title={"Almacenamiento:"}
              />
              <Selector
                options={productDetails?.options?.colors}
                selectedValue={selectedColor}
                setSelectedValue={setSelectedColor}
                title={"Color:"}
              />
            </div>
            <button
              onClick={handleAddCart}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Comprar
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
