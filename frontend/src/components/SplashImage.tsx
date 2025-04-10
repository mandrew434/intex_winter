import React, { useState, useEffect } from 'react';
import { Movie } from '../types/Movie';

interface SplashImageProps {
  movies: Movie[];
  rotationInterval?: number; // in milliseconds, default = 5000ms (5 seconds)
}

const SplashImage: React.FC<SplashImageProps> = ({
  movies,
  rotationInterval = 5000,
}) => {
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // When the movies array changes, shuffle and select 5 movies
  useEffect(() => {
    if (movies.length > 0) {
      // Create a shallow copy and shuffle the movies array
      const moviesCopy = [...movies];
      for (let i = moviesCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [moviesCopy[i], moviesCopy[j]] = [moviesCopy[j], moviesCopy[i]];
      }
      // Select the first five movies (or less if there aren't five)
      const fiveMovies = moviesCopy.slice(0, Math.min(5, moviesCopy.length));
      setSelectedMovies(fiveMovies);
      setCurrentIndex(0);
    }
  }, [movies]);

  // Set up the timer to rotate through the selected movies
  useEffect(() => {
    if (selectedMovies.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedMovies.length);
      }, rotationInterval);
      return () => clearInterval(timer);
    }
  }, [selectedMovies, rotationInterval]);

  if (selectedMovies.length === 0) {
    return null;
  }

  const currentMovie = selectedMovies[currentIndex];

  // Use movie.posterUrl if available; otherwise, use a fallback placeholder image.
  const formattedTitle = currentMovie.title.replace(/:/g, '');
  // console.log('Formatted Title:', formattedTitle); // Debugging line
  const backgroundImage = `https://intexstorage2025.blob.core.windows.net/intexcontainer/Movie Posters/${formattedTitle}.jpg`;

  return (
    <div
      className="splash-image"
      style={{
        width: '100%',
        height: '400px',
        background: `url(${backgroundImage}) center/cover no-repeat`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        position: 'relative',
      }}
    >
      {/* Optionally add an overlay for better text readability */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}
      />
      <div style={{ zIndex: 1, textAlign: 'center', padding: '20px' }}>
        <h1>{currentMovie.title}</h1>
      </div>
    </div>
  );
};

export default SplashImage;
