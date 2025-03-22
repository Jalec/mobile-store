import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetail";
import { expect, test } from "vitest";

test("renders product list page on '/' route", () => {
  expect(() => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<ProductList />} />
        </Routes>
      </MemoryRouter>
    );
  }).not.toThrow();
});

test("renders product detail page on '/product/:id' route", () => {
  render(
    <MemoryRouter initialEntries={["/product/1"]}>
      <Routes>
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/ProductDetail:\s*\d+/i)).toBeInTheDocument();
});
