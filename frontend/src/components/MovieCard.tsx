import React from 'react';
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
  // console.log('Formatted Title:', formattedTitle); // Debugging line

  // ***** CHANGED: Build the image path using the formatted title *****
  const backgroundImage = `./MovieImagesFolder/MoviePosters/${formattedTitle}.jpg`;

  return (
    <div
      className="movie-card m-2"
      style={{ flex: '0 0 auto', width: '150px', cursor: 'pointer' }}
    >
      {/* ***** CHANGED: Display the image using the generated backgroundImage path ***** */}
      <img src={backgroundImage} alt={formattedTitle} className="img-fluid" />

      <p className="mt-2 text-center">{movie.title}</p>
    </div>
  );
};

export default MovieCard;
