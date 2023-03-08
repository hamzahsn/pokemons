import React from "react";
import { Routes, Route } from "react-router-dom";

import { PokemonContextProvider } from "./context/pokemonContext";
import { Home, PokemonDetail, Favorites } from "./pages";
import { Header } from "./components";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <PokemonContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="pokemon/:name" element={<PokemonDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </PokemonContextProvider>
    </div>
  );
}

export default App;
