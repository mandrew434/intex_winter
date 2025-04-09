import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';
import { Movie } from '../types/Movie';

const AllMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetch('https://localhost:5000/api/Movie/all')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        return response.json();
      })
      .then((data: Movie[]) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="container mt-4">Loading movies...</div>;
  }
  if (error) {
    return <div className="container mt-4">Error: {error}</div>;
  }

  return (
    <div className="container mt-4">
      <h1>All Movies</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <MovieList movies={filteredMovies} />
    </div>
  );
};

export default AllMoviesPage;
