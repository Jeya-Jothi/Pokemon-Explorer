import React from 'react';

function Header({ selectedType, setSelectedType, searchTerm, setSearchTerm, types }) {
  return (
    <div className="fixed-header">
      <header>Pokémon Explorer</header>

      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="filter-dropdown"
      >
        <option value="All">All Types</option>
        {types.sort().map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Search Pokémon by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </div>
  );
}

export default Header;
