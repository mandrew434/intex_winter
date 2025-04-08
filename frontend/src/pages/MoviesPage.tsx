// HomePage.tsx
import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import MovieCarousel from '../components/MovieCarousel';
import { Movie } from '../types/Movie';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import Logout from '../components/Logout';

const MoviesPage: React.FC = () => {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [newReleases, setNewReleases] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);

  useEffect(() => {
    // Replace these with your own fetch calls (for example, using axios or fetch API)
    const fetchMovies = async () => {
      const sampleFeatured: Movie = {
        id: 1,
        title: 'Featured Blockbuster',
        bannerImage: 'https://via.placeholder.com/1500x600',
        overview: 'Experience a unique cinematic journey with our featured movie.'
      };

      const sampleMovies: Movie[] = [
        { id: 2, title: 'Movie 1', posterUrl: 'https://via.placeholder.com/300x450' },
        { id: 3, title: 'Movie 2', posterUrl: 'https://via.placeholder.com/300x450' },
        { id: 4, title: 'Movie 3', posterUrl: 'https://via.placeholder.com/300x450' },
        { id: 5, title: 'Movie 4', posterUrl: 'https://via.placeholder.com/300x450' },
        { id: 6, title: 'Movie 5', posterUrl: 'https://via.placeholder.com/300x450' },
        { id: 7, title: 'Movie 6', posterUrl: 'https://via.placeholder.com/300x450' }
      ];

      setFeaturedMovie(sampleFeatured);
      setTrendingMovies(sampleMovies);
      setNewReleases(sampleMovies);
      setTopRated(sampleMovies);
    };

    fetchMovies();
  }, []);

  return (
    <AuthorizeView>
      <span>
        <Logout>
          Logout <AuthorizedUser value="email" />
        </Logout>
      </span>
        <div className="movies-page">
          {featuredMovie && <Banner movie={featuredMovie} />}
          <div className="container">
            <MovieCarousel title="Top Rated" movies={trendingMovies} />
            <MovieCarousel title="Find Your Next Favorite" movies={newReleases} />
            <MovieCarousel title="Top Rated" movies={topRated} />
          </div>
        </div>
    </AuthorizeView>
  );
};

export default MoviesPage;
