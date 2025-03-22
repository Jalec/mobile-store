import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import ProductItem from "../components/ProductItem";

const mockProduct = {
  brand: "TestBrand",
  model: "TestModel",
  price: 99.99,
  imgUrl: "path/to/image.jpg",
};

describe("ProductItem Component", () => {
  test("renders product details correctly", () => {
    render(<ProductItem product={mockProduct} />);

    const productNameElements = screen.getAllByText((content) => {
      return content.includes("TestBrand") || content.includes("TestModel");
    });

    // Assert that at least one element contains the expected text
    expect(
      productNameElements.some(
        (element) => element.textContent === "TestBrand - TestModel"
      )
    ).toBeTruthy();

    // Check if the price is displayed
    expect(screen.getByText("$99.99")).toBeInTheDocument();
  });
});
