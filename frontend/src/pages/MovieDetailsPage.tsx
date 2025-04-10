import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Define the Movie interface with the required fields
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
}

const MovieDetailsPage: React.FC = () => {
  // Extract the "showId" parameter from the URL
  const { showId } = useParams<{ showId: string }>();
  const navigate = useNavigate();

  // Set up state variables for the movie, loading status, and any potential error
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the movie details when the component mounts or when showId changes
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Make an API call to fetch details for the movie with the provided showId.
        // Adjust the URL endpoint according to your backend routing.
        const response = await fetch(
          `https://localhost:5000/api/Movie/moviedetails/${showId}`
        );
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

  // Render loading, error, or the movie details
  if (loading) {
    return <div className="container mt-4">Loading movie details...</div>;
  }

  if (error) {
    return <div className="container mt-4">Error: {error}</div>;
  }

  if (!movie) {
    return <div className="container mt-4">No movie details found.</div>;
  }

  // **** NEW: Compute the image path exactly like in MovieCard ****
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
  //   const backgroundImage = `/MovieImagesFolder/MoviePosters/${formattedTitle}.jpg`;
  const backgroundImage = `https://intexstorage2025.blob.core.windows.net/intexcontainer/${encodedFolder}/${formattedTitle}.jpg`;

  // Handler to navigate back to the previous page
  const handleBack = () => {
    navigate(-1);
    // Optionally, force scroll to top if needed:
    // window.scrollTo(0, 0);
  };

  return (
    <div className="container mt-4">
      {/* Back Button fixed to the top left corner */}
      <button
        className="btn btn-secondary"
        onClick={handleBack}
        style={{ position: 'fixed', top: '20px', left: '20px', zIndex: 1000 }}
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
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
