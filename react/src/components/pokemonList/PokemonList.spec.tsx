import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";

import { PokemonList } from "./";

describe("PokemonList", () => {
  const data = {
    results: [
      { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
      { name: "squirtle", url: "https://pokeapi.co/api/v2/pokemon/7/" },
    ],
  };
  const onPreviousPage = jest.fn();
  const onNextPage = jest.fn();
  const page = 5;

  const setup = () =>
    render(
      <Router>
        <PokemonList
          data={data}
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage}
          page={page}
        />
      </Router>
    );

  it("renders a table with Pokemon names and links", () => {
    setup();
    const pokemonRows = screen.getAllByRole("row");

    // eslint-disable-next-line testing-library/no-node-access
    const headerCells = pokemonRows[0].querySelectorAll("th");
    expect(headerCells[0]).toHaveTextContent("Pokemon");
    expect(headerCells[1]).toHaveTextContent("Link");

    const pokemonCells = pokemonRows
      .slice(1)
      // eslint-disable-next-line testing-library/no-node-access
      .flatMap((row) => row.querySelectorAll("td"));

    expect(pokemonCells).toHaveLength(3);

    expect(pokemonCells[0][0]).toHaveTextContent("bulbasaur");
    expect(pokemonCells[0][1]).toHaveTextContent(
      "https://pokeapi.co/api/v2/pokemon/1/"
    );
    expect(pokemonCells[1][0]).toHaveTextContent("charmander");
    expect(pokemonCells[1][1]).toHaveTextContent(
      "https://pokeapi.co/api/v2/pokemon/4/"
    );
    expect(pokemonCells[2][0]).toHaveTextContent("squirtle");
    expect(pokemonCells[2][1]).toHaveTextContent(
      "https://pokeapi.co/api/v2/pokemon/7/"
    );
  });

  it("calls the onPreviousPage and onNextPage functions when the corresponding buttons are clicked", () => {
    setup();
    const previousButton = screen.getByRole("button", { name: "Previous" });
    const nextButton = screen.getByRole("button", { name: "Next" });

    userEvent.click(previousButton);
    expect(onPreviousPage).toHaveBeenCalled();

    userEvent.click(nextButton);
    expect(onNextPage).toHaveBeenCalled();
  });
});
