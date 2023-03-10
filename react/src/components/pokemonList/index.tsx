import React from "react";
import { Link } from "react-router-dom";

import { PokemonContext, TPokemon } from "../../context/pokemonContext";

export type TPokemonList = {
  data: any;
  onPreviousPage: () => void;
  onNextPage: () => void;
  page: number;
};

export const PokemonList = ({
  data,
  onPreviousPage,
  onNextPage,
  page,
}: TPokemonList) => {
  const { setPokemons, pokemons } = React.useContext(PokemonContext);

  const handleFavoritePokemon = (pokemon: TPokemon) => {
    const index = pokemons.findIndex((p) => p.name === pokemon.name);
    if (index === -1) {
      const newFavorites = [...pokemons, pokemon];
      setPokemons(newFavorites);
    } else {
      const newFavorites = [...pokemons];
      newFavorites.splice(index, 1);
      setPokemons(newFavorites);
    }
  };

  const isPokemonLiked = (pokemon: TPokemon) => {
    return pokemons.some((p) => p.name === pokemon.name);
  };

  return (
    <>
      <table className="w-9/12 text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="flex w-full text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
          <tr className="w-full">
            <th scope="col" className="px-5 py-3 text-left">
              Pokemon
            </th>
            <th scope="col" className="px-5 py-3 text-left">
              Link
            </th>
          </tr>
        </thead>
        <tbody className="bg-grey-light flex flex-col items-center overflow-y-scroll w-full">
          {data?.results?.map((pokemon: any, index: number) => (
            <tr
              key={index}
              className="flex w-full bg-white border-b odd:bg-gray-800 even:bg-gray-700
              dark:border-gray-700 items-center"
            >
              <td className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center justify-center">
                {pokemon.name}
              </td>
              <td className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center cursor-pointer justify-center">
                <Link to={`/pokemon/${pokemon.name}`}>{pokemon.url}</Link>
              </td>
              <td className="px-20 py-4 font-medium text-gray-900  dark:text-white text-center justify-center">
                <button
                  onClick={() => handleFavoritePokemon(pokemon)}
                  name="Like"
                  title="Like"
                  className="px-6 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                      fill={`${isPokemonLiked(pokemon) ? "red" : "gray"}`}
                    ></path>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex mt-5">
        <nav aria-label="Pokemon list">
          <ul className="inline-flex -space-x-px">
            <li>
              <button
                disabled={page <= 1}
                name="Previous"
                onClick={onPreviousPage}
                className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-100 
                ${page <= 1 && "cursor-not-allowed"}
                `}
              >
                Previous
              </button>
            </li>
            <li>
              <button
                name="Next"
                onClick={onNextPage}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
