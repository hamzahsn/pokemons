import React from "react";
import { render, screen } from "@testing-library/react";
import { Home } from "./";

// mock useFetch hook
jest.mock("../../hooks/useFetch", () => ({
  __esModule: true,
  default: jest.fn(() => ({ data: [], error: null, loading: false })),
}));

describe("Home component", () => {
  it("should render loading message when loading is true", () => {
    const mockedUseFetch = jest.requireMock("../../hooks/useFetch");
    mockedUseFetch.default.mockReturnValue({ loading: true });

    render(<Home />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error message when there is an error fetching data", () => {
    const mockedUseFetch = jest.requireMock("../../hooks/useFetch");
    mockedUseFetch.default.mockReturnValue({ error: "Error fetching data" });

    render(<Home />);

    expect(screen.getByText("Error fetching data")).toBeInTheDocument();
  });

  it("renders PokemonList component when data is fetched", async () => {
    const mockedUseFetch = jest.requireMock("../../hooks/useFetch");

    mockedUseFetch.default.mockReturnValue({
      data: [
        {
          name: "bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/",
        },
      ],
    });

    render(<Home />);

    expect(screen.getByRole("list")).toBeInTheDocument();
    // expect(screen.getByText("bulbasaur")).toBeInTheDocument();
  });
});
