import React from 'react';

function PokemonCard({ pokemon }) {
  return (
    <div className="pokemon-card">
      <h3>{pokemon.name}</h3>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-img" />
      <p>ID: {pokemon.id}</p>
      <p>Type: {pokemon.types.map(t => t.type.name).join(', ')}</p>
    </div>
  );
}

export default PokemonCard;
