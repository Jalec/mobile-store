import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductDetail } from "../services/productService";
import Selector from "../components/Selector";
import ProductDescription from "../components/ProductDescription";

function ProductDetail() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const data = await fetchProductDetail(id);
        console.log(data);
        setProductDetails(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    getProductDetails();
  }, [id]);

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
                options={productDetails?.internalMemory}
                selectedValue={selectedStorage}
                setSelectedValue={setSelectedStorage}
                title={"Almacenamiento:"}
              />
              <Selector
                options={productDetails?.colors}
                selectedValue={selectedColor}
                setSelectedValue={setSelectedColor}
                title={"Color:"}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
