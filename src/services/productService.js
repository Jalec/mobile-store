const API_URL = "https://itx-frontend-test.onrender.com";
const CACHE_KEY = "cachedProducts";
const CACHE_EXPIRATION = 60 * 60 * 1000; // 1 hour of expiration

// fetchProducts: retrieves the list of products
export const fetchProducts = async () => {
  const cachedData = localStorage.getItem(CACHE_KEY);

  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);

    if (Date.now() - timestamp < CACHE_EXPIRATION) {
      console.log("Using cached data");
      return data;
    }
  }

  console.log("Fetching new data from API...");
  const response = await fetch(`${API_URL}/api/product`);
  if (!response) {
    throw new Error("Failed to fetch products");
  }
  const products = await response.json();

  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({ data: products, timestamp: Date.now() })
  );

  return products;
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
