import React, { useReducer } from "react";
import useFetch from "../../hooks/useFetch";

import { PokemonList, Image } from "../../components";

export const Home = () => {
  const [event, updateEvent] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next };
    },
    { page: 1 }
  );

  const {
    data: pokemons,
    error,
    loading,
  }: { data: any; error: any; loading: boolean } = useFetch({
    path: "pokemon",
    limit: 50,
    page: event.page,
  });

  const handlePreviousPage = () => {
    updateEvent({ page: event.page - 1 });
  };

  const handleNextPage = () => {
    updateEvent({ page: event.page + 1 });
  };

  return (
    <div className="flex flex-col items-center">
      <Image />
      {error && error}
      {loading && <span>Loading...</span>}
      {pokemons && (
        <PokemonList
          data={pokemons}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
          page={event.page}
        />
      )}
    </div>
  );
};
