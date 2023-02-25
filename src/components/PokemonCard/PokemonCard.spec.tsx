import React from "react";
import { render, waitFor, screen } from "@testing-library/react";

import { PokemonCard } from "./";

describe("PokemonCard", () => {
  const pokemon = {
    name: "pikachu",
    url: "https://pokeapi.co/api/v2/pokemon/25/",
  };

  it("renders the Pokemon name and image", async () => {
    jest.mock("../../hooks/useFetch", () => ({
      __esModule: true,
      default: jest.fn(() => ({
        data: {
          id: 25,
        },
        error: null,
        loading: true,
      })),
    }));

    render(<PokemonCard name={pokemon.name} url={pokemon.url} />);

    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(screen.getByText(pokemon.name)).toBeInTheDocument();
    // eslint-disable-next-line testing-library/prefer-screen-queries
    await waitFor(() => {
      expect(screen.getByAltText(pokemon.name)).toHaveAttribute(
        "src",
        "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/25.svg"
      );
    });
  });
});
