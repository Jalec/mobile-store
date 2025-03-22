import { render, screen, waitFor } from "@testing-library/react";
import ProductList from "../components/ProductList";
import { fetchProducts } from "../services/productService";
import { describe, expect, it, vi } from "vitest";

// Mock the fetchProducts function
vi.mock("../services/productService", () => ({
  fetchProducts: vi.fn(),
}));

describe("ProductList Component", () => {
  it("renders the product list after fetching data", async () => {
    // Mock API response
    fetchProducts.mockResolvedValue([
      { id: 1, name: "Product A", price: 9.99 },
      { id: 2, name: "Product B", price: 19.99 },
    ]);

    render(<ProductList />);

    // Wait for the products to be displayed
    await waitFor(() => {
      expect(screen.getByText("Product A - $9.99")).toBeInTheDocument();
      expect(screen.getByText("Product B - $19.99")).toBeInTheDocument();
    });
  });
});
