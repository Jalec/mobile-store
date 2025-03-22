import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import ProductList from "../pages/ProductList";

// Mock the ProductItem component
vi.mock("../components/ProductItem", () => ({
  default: ({ product }) => (
    <div data-testid="product-item">{product.name}</div>
  ),
}));

// Mock the testData
vi.mock("../assets/testAPI", () => ({
  testData: {
    products: [
      { id: 1, name: "Test Product 1" },
      { id: 2, name: "Test Product 2" },
    ],
  },
}));

test("displays ProductItems after fetching products", async () => {
  render(<ProductList />);

  // Check that ProductItems are rendered
  const productItems = await screen.findAllByTestId("product-item");
  expect(productItems).toHaveLength(2);

  // Verify the content of the ProductItems
  expect(screen.getByText("Test Product 1")).toBeInTheDocument();
  expect(screen.getByText("Test Product 2")).toBeInTheDocument();
});
