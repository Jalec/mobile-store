function ProductItem({ product }) {
  return (
    <div className="flex flex-col items-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <img
        className="w-48 h-48 object-contain mb-4"
        src={product.imgUrl}
        alt={`${product.brand} ${product.model}`}
        onError={(e) => {
          e.target.src = "path/to/fallback-image.jpg"; // Fallback image
        }}
      />
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-800">
          <strong>{product.brand}</strong> - {product.model}
        </p>
        <p className="text-xl font-bold text-gray-900 mt-2">${product.price}</p>
      </div>
    </div>
  );
}

export default ProductItem;
