import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import GenreFilter, { GenreGroup } from '../components/GenreFilter';
import MovieList from '../components/MovieList';
import { Movie } from '../types/Movie';
import AuthorizeView from '../components/AuthorizeView';

const AllMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const navigate = useNavigate();

  // Define eight main genre groups by combining similar fields.
  const mainGenres: GenreGroup[] = [
    {
      id: 'action-adventure',
      label: 'Action & Adventure',
      keys: ['action', 'adventure', 'tvAction']
    },
    {
      id: 'comedy',
      label: 'Comedy',
      keys: ['comedies', 'comediesDramasInternationalMovies', 'comediesInternationalMovies', 'comediesRomanticMovies', 'tvComedies', 'talkShowsTvComedies']
    },
    {
      id: 'drama',
      label: 'Drama',
      keys: ['dramas', 'dramasInternationalMovies', 'dramasRomanticMovies', 'tvDramas', 'internationalTvShowsRomanticTvShowsTvDramas']
    },
    {
      id: 'documentary',
      label: 'Documentary & Docuseries',
      keys: ['documentaries', 'documentariesInternationalMovies', 'docuseries', 'britishTvShowsDocuseriesInternationalTvShows', 'crimeTvShowsDocuseries']
    },
    {
      id: 'horror-thriller',
      label: 'Horror & Thriller',
      keys: ['horrorMovies', 'thrillers', 'internationalMoviesThrillers']
    },
    {
      id: 'family',
      label: 'Family & Kids',
      keys: ['children', 'familyMovies', 'kidsTv']
    },
    {
      id: 'fantasy-musical',
      label: 'Fantasy & Musical',
      keys: ['fantasy', 'musicals']
    },
    {
      id: 'international',
      label: 'International & Reality',
      keys: ['animeSeriesInternationalTvShows', 'languageTvShows', 'natureTv', 'realityTv', 'spirituality']
    }
  ];

  // Fetch movies from your API.
  useEffect(() => {
    fetch('https://localhost:5000/api/Movie/all')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        return response.json();
      })
      .then((data: Movie[]) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter movies by search term and selected main genre groups.
  // A movie qualifies if its title matches the search term and, if any
  // main genre is selected, if for at least one selected group one of the
  // movie’s corresponding keys has a value of 1.
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre =
      selectedGenres.length === 0 ||
      selectedGenres.some((groupId) => {
        const group = mainGenres.find((g) => g.id === groupId);
        if (!group) return false;
        return group.keys.some((key) => (movie as any)[key] === 1);
      });
    return matchesSearch && matchesGenre;
  });

  // Handle checkbox changes from the GenreFilter component.
  const handleGenreChange = (genreId: string, checked: boolean) => {
    setSelectedGenres((prev) =>
      checked ? [...prev, genreId] : prev.filter((g) => g !== genreId)
    );
  };

  if (loading) {
    return <div className="container mt-4">Loading movies...</div>;
  }
  if (error) {
    return <div className="container mt-4">Error: {error}</div>;
  }

    // Handler to navigate back to the previous page
    const handleBack = () => {
        navigate('/movies');
    // Optionally, force scroll to top if needed:
    // window.scrollTo(0, 0);
    };

  return (
    <AuthorizeView>
    <div className="container mt-4">
              {/* Back Button fixed to the top left corner */}
      <button
        className="btn btn-secondary"
        onClick={handleBack}
        style={{ position: 'fixed', top: '20px', left: '20px', zIndex: 1000 }}
      >
        &larr; Back
      </button>
      <h1>All Movies</h1>
      <div className="row">
        {/* Left column: Genre Filter */}
        <div className="col-md-3 mb-4">
          <GenreFilter
            genreGroups={mainGenres}
            selectedGenres={selectedGenres}
            onGenreChange={handleGenreChange}
          />
        </div>
        {/* Right column: Search and Movie List */}
        <div className="col-md-9">
          <div className="mb-3">
          <SearchBar search={search} setSearch={setSearch} />
          </div>
          <MovieList movies={filteredMovies} />
        </div>
      </div>
    </div>
    </AuthorizeView>
  );
};

export default AllMoviesPage;
