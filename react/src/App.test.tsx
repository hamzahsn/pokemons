import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";

describe("App", () => {
  it("renders header navigation links", () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const homeLink = screen.getByText("Home");
    const favoritesLink = screen.getByText("My Favorites");

    expect(homeLink).toBeInTheDocument();
    expect(favoritesLink).toBeInTheDocument();
  });
});
