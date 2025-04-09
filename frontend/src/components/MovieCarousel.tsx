import React, { useState, useEffect, useRef } from 'react';
import { Movie } from '../types/Movie';
import MovieCard from './MovieCard';

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ title, movies }) => {
  // Set the initial number of movies to display in the carousel.
  const [visibleCount, setVisibleCount] = useState(10);

  // Create refs to the scroll container and the sentinel element.
  const containerRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Reset visible count when the movies prop changes (for instance, after a search).
  useEffect(() => {
    setVisibleCount(10);
  }, [movies]);

  // Set up an Intersection Observer that triggers when the sentinel element at
  // the end of the carousel comes fully into view.
  useEffect(() => {
    if (!containerRef.current) return;

    const observerOptions = {
      root: containerRef.current,
      rootMargin: '0px',
      threshold: 1.0, // Trigger only when the entire sentinel element is visible.
    };

    const observer = new IntersectionObserver((entries) => {
      // If the sentinel is fully visible and there are more movies to display, load more.
      if (entries[0].isIntersecting && visibleCount < movies.length) {
        setVisibleCount((prev) => Math.min(prev + 5, movies.length));
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

  // Slice the movies array to only show the movies that are currently visible.
  const moviesToShow = movies.slice(0, visibleCount);

  return (
    <section className="movie-carousel mb-4">
      <h3 className="mb-3">{title}</h3>
      <div
        ref={containerRef}
        className="d-flex overflow-auto"
        style={{ gap: '10px', paddingBottom: '10px' }}
      >
        {moviesToShow.map((movie) => (
          <MovieCard key={movie.showId} movie={movie} />
        ))}
        {/* Sentinel element at the end of the carousel for triggering loading more movies. */}
        <div ref={loaderRef} style={{ minWidth: '1px', height: '1px' }} />
      </div>
    </section>
  );
};

export default MovieCarousel;