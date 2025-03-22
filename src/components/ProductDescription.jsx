import React from "react";

function ProductDescription({ productDetails }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <p>
          <strong>Precio:</strong> ${productDetails.price}
        </p>
        <p>
          <strong>CPU:</strong> {productDetails.cpu}
        </p>
        <p>
          <strong>RAM:</strong> {productDetails.ram}
        </p>
        <p>
          <strong>Sistema Operativo:</strong> {productDetails.os}
        </p>
        <p>
          <strong>Resolución de pantalla:</strong>{" "}
          {productDetails.displayResolution}
        </p>
        <p>
          <strong>Batería:</strong> {productDetails.battery}
        </p>
        <p>
          <strong>Cámaras:</strong> {productDetails.primaryCamera}
        </p>
        <p>
          <strong>Dimensiones:</strong> {productDetails.dimentions}
        </p>
        <p>
          <strong>Peso:</strong> {productDetails.weight}
        </p>
      </div>
    </>
  );
}

export default ProductDescription;
