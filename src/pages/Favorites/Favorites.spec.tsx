import React from "react";
import { render, screen } from "@testing-library/react";

import { Favorites } from "./";
import { PokemonContext } from "../../context/pokemonContext";

describe("Favorites component", () => {
  it("renders My Favorite Pokemons heading", () => {
    render(
      <PokemonContext.Provider value={{ pokemons: [], setPokemons: () => {} }}>
        <Favorites />
      </PokemonContext.Provider>
    );

    expect(screen.getByText("My Favorite Pokemons")).toBeInTheDocument();
  });

  it("renders PokemonCards when there are pokemons in the context", () => {
    const mockPokemons = [
      { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
    ];
    render(
      <PokemonContext.Provider
        value={{ pokemons: mockPokemons, setPokemons: () => {} }}
      >
        <Favorites />
      </PokemonContext.Provider>
    );

    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("charmander")).toBeInTheDocument();
  });

  it("does not render PokemonCards when there are no pokemons in the context", () => {
    render(
      <PokemonContext.Provider value={{ pokemons: [], setPokemons: () => {} }}>
        <Favorites />
      </PokemonContext.Provider>
    );

    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });
});
