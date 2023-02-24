import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home, PokemonDetail, Favorites } from "./pages";
import { Header } from "./components";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="pokemon/:name" element={<PokemonDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
