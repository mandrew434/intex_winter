// HomePage.tsx
import React, { useState, useEffect } from 'react';
// import Banner from '../components/Banner';
import MovieCarousel from '../components/MovieCarousel';
import { Movie } from '../types/Movie';

const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(`https://localhost:5000/api/Movie/all`);
      const movieData = await response.json();
      setMovies(movieData);
    };

    fetchMovies();
  }, []);

  return (
    <div className="movies-page">
      <div className="container">
        <MovieCarousel title="Top Rated" movies={movies} />
        <MovieCarousel title="Find Your Next Favorite" movies={movies} />
        <MovieCarousel title="Top Rated" movies={movies} />
      </div>
    </div>
  );
};

export default MoviesPage;
