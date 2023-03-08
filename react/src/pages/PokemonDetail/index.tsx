import React from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import "./PokemonDetails.css";

const renderList = (key: string) => (data: any[]) => {
  return data.map((item: any, index: number) => (
    <ul key={index} className="list-disc list-inside">
      <li>{item[key].name}</li>
    </ul>
  ));
};

const RenderStyledChildren = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-start justify-left mb-5">
      {children}
    </div>
  );
};

export const PokemonDetail = () => {
  let { name } = useParams();

  const {
    data: pokemon,
    error,
    loading,
  }: { data: any; error: any; loading: boolean } = useFetch({
    param: name,
  }) || {};

  const renderPokemonAbilities = renderList("ability");
  const renderPokemonTypes = renderList("type");
  const renderPokemonStats = renderList("stat");

  return (
    <div className="flex items-center justify-center wrapper">
      {error && error}
      {loading && <div>Loading...</div>}
      {pokemon && name && (
        <div className="flex">
          <div className="mr-12">
            <img
              // Server is slow but it provide a good quality images instead of already loaded sprites...
              src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
              alt={name}
            />
          </div>
          <div className="flex flex-col items-start justify-left">
            <span className="mb-5 text-5xl">{name}</span>
            <div className="flex flex-col items-start justify-left ">
              <span className="mb-5 text-xl">Weight: {pokemon.weight} </span>
            </div>
            <div className="flex flex-col items-start justify-left ">
              <span className="mb-5 text-xl">
                Move{pokemon.moves.length > 1 ? "s" : ""}:{" "}
                {pokemon.moves.length}
              </span>
            </div>
            <RenderStyledChildren>
              <span className=" text-3xl">Abilities</span>
              {renderPokemonAbilities(pokemon.abilities)}
            </RenderStyledChildren>
            <div className="flex flex-col items-start justify-left mb-5"></div>
            <RenderStyledChildren>
              <span className=" text-3xl">Types</span>
              {renderPokemonTypes(pokemon.types)}
            </RenderStyledChildren>
            <RenderStyledChildren>
              <span className=" text-3xl">Stats</span>
              {renderPokemonStats(pokemon.stats)}
            </RenderStyledChildren>
          </div>
        </div>
      )}
    </div>
  );
};
