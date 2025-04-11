import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ContentRecCarousel from '../components/ContentRecCarousel';

// Define the Movie interface with the required fields, including genres.
interface Movie {
  type: string;
  title: string;
  director: string;
  cast: string;
  country: string;
  releaseYear: number;
  rating: string;
  duration: string;
  description: string;
  // Genre properties (each is a number, where a nonzero value indicates the genre applies)
  action: number;
  adventure: number;
  animeSeriesInternationalTvShows: number;
  britishTvShowsDocuseriesInternationalTvShows: number;
  children: number;
  comedies: number;
  comediesDramasInternationalMovies: number;
  comediesInternationalMovies: number;
  comediesRomanticMovies: number;
  crimeTvShowsDocuseries: number;
  documentaries: number;
  documentariesInternationalMovies: number;
  docuseries: number;
  dramas: number;
  dramasInternationalMovies: number;
  dramasRomanticMovies: number;
  familyMovies: number;
  fantasy: number;
  horrorMovies: number;
  internationalMoviesThrillers: number;
  internationalTvShowsRomanticTvShowsTvDramas: number;
  kidsTv: number;
  languageTvShows: number;
  musicals: number;
  natureTv: number;
  realityTv: number;
  spirituality: number;
  tvAction: number;
  tvComedies: number;
  tvDramas: number;
  talkShowsTvComedies: number;
  thrillers: number;
}

const MovieDetailsPage: React.FC = () => {
  // Extract the "showId" parameter from the URL.
  const { showId } = useParams<{ showId: string }>();
  const navigate = useNavigate();

  // State variables.
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch movie details when the component mounts or when showId changes.
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://intex-winter-backend-had2hmbubbgfczd8.eastus-01.azurewebsites.net/api/movie/moviedetails/${showId}`);
        if (!response.ok) {
          throw new Error('Error fetching movie details');
        }
        const data: Movie = await response.json();
        setMovie(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [showId]);

  if (loading) {
    return <div className="container mt-4">Loading movie details...</div>;
  }
  if (error) {
    return <div className="container mt-4">Error: {error}</div>;
  }
  if (!movie) {
    return <div className="container mt-4">No movie details found.</div>;
  }

  // Compute the image URL exactly like in MovieCard.
  const normalizedTitle = movie.title.normalize('NFC');
  const formattedTitle = normalizedTitle
    .replace(/:/g, '')
    .replace(/&/g, '')
    .replace(/!/g, '')
    .replace(/&/g, '')
    .replace(/-/g, '')
    .replace(/\(/g, '')
    .replace(/\)/g, '')
    .replace(/"/g, '')
    .replace(/,/g, '')
    .replace(/\./g, '')
    .replace(/é/g, 'e')
    .replace(/'/g, '');
  const folderName = 'Movie Posters';
  const encodedFolder = encodeURIComponent(folderName); // becomes "Movie%20Posters"
  const backgroundImage = `https://intexstorage2025.blob.core.windows.net/intexcontainer/${encodedFolder}/${formattedTitle}.jpg`;

  // Build an array of genre keys.
  const genreKeys: (keyof Movie)[] = [
    "action",
    "adventure",
    "animeSeriesInternationalTvShows",
    "britishTvShowsDocuseriesInternationalTvShows",
    "children",
    "comedies",
    "comediesDramasInternationalMovies",
    "comediesInternationalMovies",
    "comediesRomanticMovies",
    "crimeTvShowsDocuseries",
    "documentaries",
    "documentariesInternationalMovies",
    "docuseries",
    "dramas",
    "dramasInternationalMovies",
    "dramasRomanticMovies",
    "familyMovies",
    "fantasy",
    "horrorMovies",
    "internationalMoviesThrillers",
    "internationalTvShowsRomanticTvShowsTvDramas",
    "kidsTv",
    "languageTvShows",
    "musicals",
    "natureTv",
    "realityTv",
    "spirituality",
    "tvAction",
    "tvComedies",
    "tvDramas",
    "talkShowsTvComedies",
    "thrillers",
  ];

  // Extract the genre names for which the movie has a truthy value.
  // (Here, any nonzero value indicates the genre applies.)
  const activeGenres = genreKeys.filter((key) => (movie as any)[key]);

  // Handler to navigate back.
  const handleBack = () => {
    navigate(-1);
  };

  // Helper function to convert camelCase or concatenated genre keys 
// to properly spaced and capitalized strings.
const prettyGenreName = (genre: string): string => {
  // Insert a space before each uppercase letter, then trim any leading/trailing space.
  const spaced = genre.replace(/([A-Z])/g, ' $1').trim();
  // Capitalize the first letter of every word.
  return spaced
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};


  return (
    <div className="container mt-4">
      {/* Back Button */}
      <button
        type="button"
        onClick={handleBack}
        style={{
          position: 'fixed',
          top: '20px',
          left: '130px',
          padding: '10px 20px',
          backgroundColor: '#007bff',  // Same blue background as Logout.
          color: '#fff',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          zIndex: 1000,
          transition: 'background-color 0.3s ease',
        }}
        onMouseOver={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#0056b3';
        }}
        onMouseOut={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#007bff';
        }}
      >
        &larr; Back
      </button>

      <div className="row">
        {/* Poster Column */}
        <div className="col-md-4">
          <img
            src={backgroundImage}
            alt={`Poster for ${movie.title}`}
            className="img-fluid"
          />
        </div>
        {/* Movie Details Column */}
        <div className="col-md-8">
          <h1>{movie.title}</h1>
          <h4>Directed by: {movie.director}</h4>
          {activeGenres.length > 0 && (
            <p>
              <strong>Genre:</strong>{" "}
              {activeGenres.map((genre) => prettyGenreName(genre as string)).join(", ")}
            </p>
          )}
          <p>
            <strong>Type:</strong> {movie.type}
          </p>
          <p>
            <strong>Cast:</strong> {movie.cast}
          </p>
          <p>
            <strong>Country:</strong> {movie.country}
          </p>
          <p>
            <strong>Release Year:</strong> {movie.releaseYear}
          </p>
          <p>
            <strong>Rating:</strong> {movie.rating}
          </p>
          <p>
            <strong>Duration:</strong> {movie.duration}
          </p>
          <p>
            <strong>Description:</strong> {movie.description}
          </p>
          <br />
          <ContentRecCarousel showId={showId || ''} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
