import React, { useState } from "react";

interface Props {
  onSearch?: (input: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder }: Props) => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch?.(searchInput);
      }}
    >
      <input
        name="search"
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder={placeholder}
        value={searchInput}
      />
      <button>Search</button>
    </form>
  );
};

export default SearchBar;
