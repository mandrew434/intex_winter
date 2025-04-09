// HomePage.tsx
import React, { useState, useEffect } from 'react';
// import Banner from '../components/Banner';
import MovieCarousel from '../components/MovieCarousel';
import { Movie } from '../types/Movie';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import Logout from '../components/Logout';
import SplashImage from '../components/SplashImage';

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
    <>
    <AuthorizeView>
      <span>
        <Logout>
          Logout <AuthorizedUser value="email" />
        </Logout>
      </span>

      <div className="movies-page">
        <div className="container">
          <SplashImage movies={movies} rotationInterval={5000} />

          <MovieCarousel title="Top Rated" movies={movies} />
          <MovieCarousel title="Find Your Next Favorite" movies={movies} />
          <MovieCarousel title="Top Rated" movies={movies} />
        </div>
      </div>
      </AuthorizeView>
      </>
  );
};

export default MoviesPage;
