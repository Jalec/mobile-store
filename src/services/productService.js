const API_URL = "https://itx-frontend-test.onrender.com";

// fetchProducts: retrieves the list of products from the api
export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/api/product`);
  if (!response) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};
