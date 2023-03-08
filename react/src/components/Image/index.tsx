import React from "react";

import Pokemon from "../../assets/pokemon.svg";

export const Image = () => {
  return (
    <div className="mb-20">
      <img src={Pokemon} alt="pokemon" sizes="(max-width: 600px) 100vw, 50vw" />
    </div>
  );
};
