import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../components/Navbar";
import { describe, expect, it } from "vitest";

describe("Navbar Component", () => {
  it("navigates to the home page when the logo is clicked", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const logo = screen.getByText("MobileStore");

    fireEvent.click(logo);

    // Ensure it redirects to the home page
    expect(window.location.pathname).toBe("/");
  });
});
