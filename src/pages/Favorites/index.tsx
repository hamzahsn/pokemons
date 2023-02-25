import React from "react";

import { PokemonCard } from "../../components";
import { PokemonContext } from "../../context/pokemonContext";
import "./Favorites.css";

export const Favorites = () => {
  const { pokemons } = React.useContext(PokemonContext);

  return (
    <div className="wrapper">
      <h1 className="text-3xl font-bold text-left">My Favorite Pokemons</h1>
      <div className="grid lg:grid-cols-4 sm:grid-cols-1 sm:gap-6 md:grid-cols-2 md:gap-2">
        {pokemons &&
          pokemons.length > 0 &&
          pokemons.map((myFavoritesPokemons, index) => (
            <PokemonCard key={index} {...myFavoritesPokemons} />
          ))}
      </div>
    </div>
  );
};
