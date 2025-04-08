// // MovieCard.tsx
// import React from 'react';
// import { Movie } from '../types/Movie';

// interface MovieCardProps {
//   movie: Movie;
// }

// const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
//   return (
//     <div
//       className="movie-card m-2"
//       style={{ flex: '0 0 auto', width: '150px', cursor: 'pointer' }}
//     >

//       {/* <img src={movie.posterUrl} alt={movie.title} className="img-fluid" /> */}
//       <p className="mt-2 text-center">{movie.title}</p>
//       <p className="mt-2 text-center">{movie.type}</p>
//     </div>
//   );
// };

// export default MovieCard;

// MovieCard.tsx
import React from 'react';
import { Movie } from '../types/Movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  // ***** CHANGED: Format the title to remove colons *****
  const formattedTitle = movie.title
    .replace(/:/g, '')
    .replace(/&/g, '')
    .replace(/!/g, '')
    .replace(/&/g, '')
    .replace(/-/g, '')
    .replace(/'/g, '');
  console.log('Formatted Title:', formattedTitle); // Debugging line

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
