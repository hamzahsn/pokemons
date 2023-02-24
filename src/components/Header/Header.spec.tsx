import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./";

test("renders Pokemon logo and links to Home and My Favorites", () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  const pokemonLogo = screen.getByAltText("Pokemon Logo");
  const homeLink = screen.getByRole("link", { name: "Home" });
  const favoritesLink = screen.getByRole("link", { name: "My Favorites" });

  expect(pokemonLogo).toBeInTheDocument();
  expect(homeLink).toBeInTheDocument();
  expect(favoritesLink).toBeInTheDocument();
});
