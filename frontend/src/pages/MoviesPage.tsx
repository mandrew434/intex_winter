// HomePage.tsx
import React, { useState, useEffect } from 'react';
// import Banner from '../components/Banner';
import MovieCarousel from '../components/MovieCarousel';
import { Movie } from '../types/Movie';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import Logout from '../components/Logout';
import SplashImage from '../components/SplashImage';
import { useNavigate } from 'react-router-dom';
import CollaborativeTest from '../components/CollaborativeTest';
import TopRatedCaro from '../components/TopRatedCaro';

const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(`https://localhost:5000/api/Movie/all`);
      const movieData = await response.json();
      setMovies(movieData);
    };

    fetchMovies();
  }, []);

  // Handler to navigate back to the previous page
  const handleBack = () => {
    navigate('/allmovies');
    // Optionally, force scroll to top if needed:
    // window.scrollTo(0, 0);
  };

  return (
    <>
      <AuthorizeView>
        <button
          className="btn btn-secondary"
          onClick={handleBack}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000,
          }}
        >
          Check out All Movies
        </button>
        <span>
          <Logout>
            Logout <AuthorizedUser value="email" />
          </Logout>
        </span>

        <div className="movies-page">
          <div className="container">
            <SplashImage movies={movies} rotationInterval={5000} />

            <TopRatedCaro />

            {/* TEST */}
            <CollaborativeTest userId={184} />

            <MovieCarousel title="Find Your Next Favorite" movies={movies} />
          </div>
        </div>
      </AuthorizeView>
    </>
  );
};

export default MoviesPage;
