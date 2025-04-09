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
      className="form-control mb-3"
      style={{ maxWidth: '300px' }}
    />
  );
};

export default SearchBar;
