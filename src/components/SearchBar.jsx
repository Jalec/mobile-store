import React, { useState } from "react";

function SearchBar({ setSearchQuery }) {
  const [search, setSearch] = useState("");

  const handleSearch = (value) => {
    setSearch(value);
    setSearchQuery(value);
  };

  return (
    <input
      type="text"
      placeholder="Buscar por modelo o marca..."
      value={search}
      onChange={(e) => handleSearch(e.target.value)}
      className=" self-end w-80 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-black-500 transition-all"
    />
  );
}

export default SearchBar;
