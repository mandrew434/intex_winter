import React from 'react';

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search movies by title..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="form-control mb-12"
      style={{ maxWidth: '1200px' }}
    />
  );
};

export default SearchBar;
