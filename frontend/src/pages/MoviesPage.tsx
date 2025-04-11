import React, { useState, useEffect } from 'react';
import MovieCarousel from '../components/MovieCarousel';
import { Movie } from '../types/Movie';
import AuthorizeView from '../components/AuthorizeView';
import SplashImage from '../components/SplashImage';
import { useNavigate } from 'react-router-dom';
import CollaborativeTest from '../components/CollaborativeTest';
import TopRatedCaro from '../components/TopRatedCaro';

const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [randomUserId, setRandomUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  // Fetch movies as before.
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        'https://intex-winter-backend-had2hmbubbgfczd8.eastus-01.azurewebsites.net/api/movie/all'
      );
      const movieData = await response.json();
      setMovies(movieData);
    };

    fetchMovies();
  }, []);

  // Pick a random user ID from an array on mount.
  useEffect(() => {
    const possibleUserIds = [184, 170, 102, 35, 84, 20, 25, 50, 99]; // Adjust these values as needed.
    const randomId = possibleUserIds[Math.floor(Math.random() * possibleUserIds.length)];
    setRandomUserId(randomId);
  }, []);

  // Handler to navigate to the "All Movies" page.
  const handleBack = () => {
    navigate('/allmovies');
  };

  // Admin Page button: Centered at the top of the page.
  const AdminPageButton: React.FC = () => {
    const handleAdmin = () => {
      navigate('/admin');
    };

    return (
      <button
        type="button"
        onClick={handleAdmin}
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%', // Center horizontally.
          transform: 'translateX(-50%)', // Precisely center by offsetting half the button's width.
          padding: '10px 20px',
          backgroundColor: '#007bff', // Blue background.
          color: '#fff',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          zIndex: 1000,
          transition: 'background-color 0.3s ease',
        }}
        onMouseOver={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#0056b3')
        }
        onMouseOut={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#007bff')
        }
      >
        Admin Page
      </button>
    );
  };

  return (
    <AuthorizeView>
      <>
        {/* Render the Admin Page button centered at the top */}
        <AdminPageButton />

        {/* Render the "Check out All Movies" button at the top-right */}
        <button
          type="button"
          onClick={handleBack}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            zIndex: 1000,
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#0056b3')
          }
          onMouseOut={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#007bff')
          }
        >
          Check out All Movies
        </button>

        <div className="movies-page">
          <div className="container">
            <SplashImage rotationInterval={5000} />
            <br />
            <br />
            <TopRatedCaro />
            
            {/* Render CollaborativeTest using the random user ID, if one was selected */}
            {randomUserId && <CollaborativeTest userId={randomUserId} />}
            
            <MovieCarousel title="Find Your Next Favorite" movies={movies} />
          </div>
        </div>
      </>
    </AuthorizeView>
  );
};

export default MoviesPage;