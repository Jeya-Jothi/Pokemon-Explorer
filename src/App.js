import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import PokemonGrid from './components/PokemonGrid';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [selectedType, setSelectedType] = useState('All');

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await res.json();

        const detailedData = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );

        setPokemonList(detailedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Pokémon:", err);
        setError(true);
        setLoading(false);
      }
    };
    
    fetchPokemons();
  }, []);

  useEffect(() => {
    const filtered = pokemonList.filter((pokemon) => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        selectedType === 'All' ||
        pokemon.types.some((t) => t.type.name === selectedType);

      return matchesSearch && matchesType;
    });

    setFilteredPokemons(filtered);
  }, [searchTerm, selectedType, pokemonList]);

  const allTypes = [...new Set(pokemonList.flatMap(p => p.types.map(t => t.type.name)))];

  if (loading) {
    return (
      <div className="status-message">
        <h2>Loading Pokémons...</h2>
        <p className="empty-message">Catch 'em all is in progress! 🕹️</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-message">
        <h2>Failed to load Pokémon 😢</h2>
        <p>Something went wrong. Please check your internet connection or try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div>
      <Header
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        types={allTypes}
      />
      <PokemonGrid filteredPokemons={filteredPokemons} />
    </div>
  );
}

export default App;
