import React, { useState, useEffect, useRef } from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../types/Movie';

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const [visibleCount, setVisibleCount] = useState(10);
  const containerRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Reset the visible count when the movie list changes (e.g., due to a new search)
  useEffect(() => {
    setVisibleCount(10);
  }, [movies]);

  useEffect(() => {
    if (!containerRef.current) return;

    const observerOptions = {
      root: containerRef.current,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && visibleCount < movies.length) {
        setVisibleCount((prev) => Math.min(prev + 10, movies.length));
      }
    }, observerOptions);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [visibleCount, movies.length]);

  const moviesToShow = movies.slice(0, visibleCount);

  return (
    <div
      ref={containerRef}
      style={{
        height: '500px', // Fixed height container
        overflowY: 'auto',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '10px',
      }}
    >
      {moviesToShow.length === 0 ? (
        <p>No matching movies found</p>
      ) : (
        <div className="d-flex flex-wrap justify-content-start">
          {moviesToShow.map((movie) => (
            <MovieCard key={movie.showId} movie={movie} />
          ))}
        </div>
      )}

      {/* Sentinel element for triggering load of more movies */}
      <div ref={loaderRef} style={{ height: '1px' }} />
    </div>
  );
};

export default MovieList;
