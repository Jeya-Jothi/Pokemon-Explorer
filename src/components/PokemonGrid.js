import React from 'react';
import PokemonCard from './PokemonCard';

function PokemonGrid({ filteredPokemons }) {
  if (filteredPokemons.length === 0) {
    return <p className="empty-message">No Pokémon match your search or filter. Try again!</p>;
  }

  return (
    <div className="pokemon-grid">
      {filteredPokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}

export default PokemonGrid;
