// MovieCard.tsx
import React from 'react';
import { Movie } from '../types/Movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div
      className="movie-card m-2"
      style={{ flex: '0 0 auto', width: '150px', cursor: 'pointer' }}
    >
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="img-fluid"
      />
      <p className="mt-2 text-center">{movie.title}</p>
    </div>
  );
};

export default MovieCard;
