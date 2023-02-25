import { createContext, useState } from "react";

export type TPokemon = {
  name: string;
  url: string;
};

export type TPokemonContextType = {
  pokemons: TPokemon[];
  setPokemons: (pokemons: TPokemon[]) => void;
};

export const PokemonContext = createContext<TPokemonContextType>({
  pokemons: [],
  setPokemons: () => {},
});

export const PokemonContextProvider = ({ children }: any) => {
  const [pokemons, setPokemons] = useState<any[]>([]);

  return (
    <PokemonContext.Provider value={{ pokemons, setPokemons }}>
      {children}
    </PokemonContext.Provider>
  );
};
