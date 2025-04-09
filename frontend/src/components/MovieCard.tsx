import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../types/Movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  // ***** CHANGED: Format the title to remove colons *****
  // console.log('Pre Normal:', movie.title);
  const normalizedTitle = movie.title.normalize('NFC');
  // console.log('Post Normal:', normalizedTitle);
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
  console.log('Formatted Title:', formattedTitle); // Debugging line

  // ***** CHANGED: Build the image path using the formatted title *****
  const backgroundImage = `./MovieImagesFolder/MoviePosters/${formattedTitle}.jpg`;

  // Use React Router's useNavigate to get a navigation function
  const navigate = useNavigate();

  // Create a click handler that attaches the show's id and navigates to the details page.
  const handleClick = () => {
    console.log(`Navigating to MovieDetailsPage for showId: ${movie.showId}`);
    // Navigate to a URL including the movie's showId.
    // You should have a corresponding route in your Router, e.g., "/movie-details/:showId"
    navigate(`/moviedetails/${movie.showId}`);
  };

  return (
    <div
      className="movie-card m-2"
      style={{ flex: '0 0 auto', width: '150px', cursor: 'pointer' }}
      onClick={handleClick} // NEW: Makes the card clickable
      role="button"         // NEW: Accessibility role indicating it's a clickable element
      tabIndex={0}          // NEW: Allows keyboard navigation (focusable element)
    >
      {/* ***** CHANGED: Display the image using the generated backgroundImage path ***** */}
      <img src={backgroundImage} alt={formattedTitle} className="img-fluid" />

      <p className="mt-2 text-center">{movie.title}</p>
    </div>
  );
};

export default MovieCard;
