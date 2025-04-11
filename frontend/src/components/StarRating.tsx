import React, { useState } from 'react';

interface StarRatingProps {
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleClick = (newRating: number) => {
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  // Render five stars. Use filled star (★) for selected and empty star (☆) for unselected.
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleClick(star)}
          style={{
            fontSize: '2rem',
            color: star <= rating ? '#ffc107' : '#e4e5e9', // Filled yellow or gray-outlined
            cursor: 'pointer',
            marginRight: '4px',
          }}
        >
          {star <= rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
};

export default StarRating;




// this would be to update it in the database

// import React, { useState } from 'react';

// interface StarRatingProps {
//   initialRating?: number;
//   onRatingChange?: (rating: number) => void;
// }

// const StarRating: React.FC<StarRatingProps> = ({ initialRating = 0, onRatingChange }) => {
//   const [rating, setRating] = useState(initialRating);

//   const handleClick = (newRating: number) => {
//     setRating(newRating);
//     if (onRatingChange) {
//       onRatingChange(newRating);
//     }
//   };

//   return (
//     <div>
//       {[1, 2, 3, 4, 5].map((star) => (
//         <span
//           key={star}
//           onClick={() => handleClick(star)}
//           style={{
//             fontSize: '2rem',
//             color: star <= rating ? '#ffc107' : '#e4e5e9', // Filled yellow or empty gray.
//             cursor: 'pointer',
//             marginRight: '4px',
//           }}
//         >
//           {star <= rating ? '★' : '☆'}
//         </span>
//       ))}
//     </div>
//   );
// };

// export default StarRating;
