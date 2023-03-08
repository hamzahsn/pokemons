import React from "react";

import { PokemonCard } from "../../components";
import { PokemonContext } from "../../context/pokemonContext";
import "./Favorites.css";

export const Favorites = () => {
  const { pokemons } = React.useContext(PokemonContext);

  return (
    <div className="wrapper">
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
