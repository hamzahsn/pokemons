import React from "react";

import { TPokemon } from "../../context/pokemonContext";
import useFetch from "../../hooks/useFetch";

export const PokemonCard = ({ name }: TPokemon) => {
  const { data: pokemon }: { data: any; error: any; loading: boolean } =
    useFetch({
      param: name,
    }) || {};

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-10">
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon?.id}.svg`}
          alt={name}
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {name}
        </h5>
      </div>
    </div>
  );
};
