import React from "react";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { PokemonDetail } from "./";

describe("PokemonDetail component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render loading message when loading is true", async () => {
    jest.mock("../../hooks/useFetch", () => ({
      __esModule: true,
      default: jest.fn(() => ({
        data: null,
        error: null,
        loading: true,
      })),
    }));

    render(
      <MemoryRouter initialEntries={["/pokemon/pikachu"]}>
        <Routes>
          <Route path="/pokemon/:name" element={<PokemonDetail />}></Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  it("should render Pokemon details when data is fetched", async () => {
    render(
      <MemoryRouter initialEntries={["/pokemon/pikachu"]}>
        <Routes>
          <Route path="/pokemon/:name" element={<PokemonDetail />}></Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("pikachu")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Weight: 60")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Moves: 101")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Abilities")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Types")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Stats")).toBeInTheDocument();
    });
  });
});
