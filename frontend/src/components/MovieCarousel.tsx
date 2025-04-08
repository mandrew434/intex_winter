// MovieCarousel.tsx
import React from 'react';
import { Movie } from '../types/Movie';
import MovieCard from './MovieCard';

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ title, movies }) => {
  return (
    <section className="movie-carousel mb-4">
      <h3 className="mb-3">{title}</h3>
      <div
        className="d-flex overflow-auto"
        style={{ gap: '10px', paddingBottom: '10px' }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.showId} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieCarousel;
