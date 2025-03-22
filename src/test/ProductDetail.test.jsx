import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import ProductDetail from "../pages/ProductDetail";
import { MemoryRouter, Routes, Route } from "react-router-dom";

// Mock useParams to return a specific product ID
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({
      id: "123",
    }),
  };
});

// Mock the fetchProductDetail function
vi.mock("../services/productService", () => ({
  fetchProductDetail: vi.fn(() =>
    Promise.resolve({
      id: "123",
      brand: "TestBrand",
      model: "TestModel",
      price: "99.99",
      imgUrl: "path/to/image.jpg",
      cpu: "Snapdragon 888",
      ram: "8GB",
      os: "Android 12",
      displayResolution: "1080x2400",
      battery: "Non-removable Li-Ion 3400 mAh battery (12.92 Wh)",
      primaryCamera: "48MP",
      dimentions: "160 x 75 x 8mm",
      weight: "200g",
      internalMemory: ["64gb", "32GB"],
      colors: ["black", "White"],
    })
  ),
}));

describe("ProductDetail Component", () => {
  test("renders product details correctly", async () => {
    // Render the component with the mocked router and API
    render(
      <MemoryRouter initialEntries={["/product/123"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the loading state to disappear
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i), {
      timeout: 10000,
    });

    // Assert that the product details are displayed
    expect(screen.getByText("TestBrand - TestModel")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByText("Snapdragon 888")).toBeInTheDocument();
    expect(screen.getByText("8GB")).toBeInTheDocument();
    expect(screen.getByText("Android 12")).toBeInTheDocument();
    expect(screen.getByText("1080x2400")).toBeInTheDocument();
    expect(screen.getByText(/3400 mAh battery/)).toBeInTheDocument();
    expect(screen.getByText("48MP")).toBeInTheDocument();
    expect(screen.getByText("160 x 75 x 8mm")).toBeInTheDocument();
    expect(screen.getByText("200g")).toBeInTheDocument();
    expect(screen.getByText("64gb")).toBeInTheDocument();
    expect(screen.getByText("black")).toBeInTheDocument();
  });
});
