import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import ProductList from "../pages/ProductList";
import { MemoryRouter } from "react-router-dom";

class IntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

vi.mock("../services/productService", () => ({
  fetchProducts: vi.fn(() =>
    Promise.resolve([
      { id: 1, model: "Test Product 1", brand: "Test Brand" },
      { id: 2, model: "Test Product 2", brand: "Test Brand" },
    ])
  ),
}));

vi.mock("../components/ProductItem", () => ({
  default: ({ product }) => (
    <div data-testid="product-item">
      {product.brand} - {product.model}
    </div>
  ),
}));

test("displays ProductItems after fetching products", async () => {
  render(
    <MemoryRouter>
      <ProductList />
    </MemoryRouter>
  );

  const productItems = await screen.findAllByTestId("product-item");
  expect(productItems).toHaveLength(2);

  // Verify the content of the ProductItems
  expect(screen.getByText("Test Brand - Test Product 1")).toBeInTheDocument();
  expect(screen.getByText("Test Brand - Test Product 2")).toBeInTheDocument();
});

test("filters products based on search input", async () => {
  render(
    <MemoryRouter>
      <ProductList />
    </MemoryRouter>
  );

  // Wait for the products to be displayed
  await screen.findAllByTestId("product-item");

  // Verify initial products
  expect(screen.getByText("Test Brand - Test Product 1")).toBeInTheDocument();
  expect(screen.getByText("Test Brand - Test Product 2")).toBeInTheDocument();

  // Simulate search
  fireEvent.change(screen.getByPlaceholderText(/buscar/i), {
    target: { value: "1" },
  });

  // Verify filtered products
  expect(screen.getByText("Test Brand - Test Product 1")).toBeInTheDocument();
  expect(
    screen.queryByText("Test Brand - Test Product 2")
  ).not.toBeInTheDocument();
});
