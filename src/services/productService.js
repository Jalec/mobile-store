const API_URL = "https://itx-frontend-test.onrender.com";

// fetchProducts: retrieves the list of products
export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/api/product`);
  if (!response) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

// fetchProductDetail: retrieves details of a single product
export const fetchProductDetail = async (productId) => {
  const response = await fetch(`${API_URL}/api/product/${productId}`);
  if (!response) {
    throw new Error("Failed to fetch the product details");
  }
  return response.json();
};

export const handleAddToCart = async (itemInfo) => {
  const response = await fetch(`${API_URL}/api/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemInfo),
  });
  return response.json();
};
