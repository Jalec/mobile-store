import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import ProductList from "../pages/ProductList";

// Mock the ProductItem component
vi.mock("../components/ProductItem", () => ({
  default: ({ product }) => (
    <div data-testid="product-item">
      {product.brand} - {product.model}
    </div>
  ),
}));

// Mock the testData
vi.mock("../assets/testAPI", () => ({
  testData: {
    products: [
      { id: 1, model: "Test Product 1", brand: "Test Brand" },
      { id: 2, model: "Test Product 2", brand: "Test Brand" },
    ],
  },
}));

test("displays ProductItems after fetching products", async () => {
  render(<ProductList />);

  // Check that ProductItems are rendered
  const productItems = await screen.findAllByTestId("product-item");
  expect(productItems).toHaveLength(2);

  // Verify the content of the ProductItems
  expect(screen.getByText("Test Brand - Test Product 1")).toBeInTheDocument();
  expect(screen.getByText("Test Brand - Test Product 2")).toBeInTheDocument();
});

test("filters products based on search input", async () => {
  render(<ProductList />);

  expect(screen.getByText("Test Brand - Test Product 1")).toBeInTheDocument();
  expect(screen.getByText("Test Brand - Test Product 2")).toBeInTheDocument();

  // Simulate search
  fireEvent.change(screen.getByPlaceholderText(/buscar/i), {
    target: { value: "1" },
  });

  // Show only test product 1
  expect(screen.getByText("Test Brand - Test Product 1")).toBeInTheDocument();
  expect(
    screen.queryByText("Test Brand - Test Product 2")
  ).not.toBeInTheDocument();
});
