// import React, { useState, useEffect } from 'react';

// interface SplashMovie {
//   title: string;
//   filename: string;
// }

// // Hard-coded array of filenames from your "public/HomeBackground" folder.
// const FILENAMES = [
//   "After.jpg",
//   "Barbarians.jpg",
//   "Barbecue.jpg",
//   "Croupier.jpg",
//   "Cuckoo.jpg",
//   "Curon.jpg",
//   "Goosebumps.jpg",
//   "GORA.jpg",
//   "Holidate.jpg",
//   "Justice.jpg",
//   "Payday.jpg",
//   "Security.jpg",
// ];

// const SplashImage: React.FC<{ rotationInterval?: number }> = ({ rotationInterval = 5000 }) => {
//   // Convert filenames into an array of SplashMovie objects.
//   const movies: SplashMovie[] = FILENAMES.map((filename) => {
//     // Remove the ".jpg" extension to derive the title.
//     const title = filename.replace(/\.jpg$/i, "");
//     return { title, filename };
//   });

//   // State to track the current index.
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Set up the timer to rotate through the movies.
//   useEffect(() => {
//     if (movies.length > 0) {
//       const timer = setInterval(() => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
//       }, rotationInterval);
//       return () => clearInterval(timer);
//     }
//   }, [movies, rotationInterval]);

//   if (movies.length === 0) return null;

//   const currentMovie = movies[currentIndex];
//   // Build the URL to the local image in your public/HomeBackground folder.
//   const backgroundImageUrl = `/HomeBackground/${currentMovie.filename}`;

//   return (
//     <div
//       className="splash-image"
//       style={{
//         width: '100%',
//         height: '600px', // Set the height as desired.
//         background: `url(${backgroundImageUrl}) center/cover no-repeat`,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         color: '#fff',
//         position: 'relative',
//       }}
//     >
//       {/* Optional overlay for better text readability */}
//       <div
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: 'rgba(0, 0, 0, 0.4)',
//         }}
//       />
//       <div
//         style={{
//           zIndex: 1,
//           textAlign: 'center',
//           padding: '20px',
//           position: 'absolute',
//           bottom: '20px', // Adjust to reposition the title.
//           width: '100%',
//         }}
//       >
//         <h1>{currentMovie.title}</h1>
//       </div>
//     </div>
//   );
// };

// export default SplashImage;


import React, { useEffect, useState } from 'react';

interface SplashMovie {
  title: string;
  filename: string;
}

// Hard-coded array of filenames from your public/HomeBackground folder.
const FILENAMES = [
  "After.jpg",
  "Barbarians.jpg",
  "Barbecue.jpg",
  "Croupier.jpg",
  "Cuckoo.jpg",
  "Curon.jpg",
  "Goosebumps.jpg",
  "GORA.jpg",
  "Holidate.jpg",
  "Justice.jpg",
  "Payday.jpg",
  "Security.jpg",
];

const SplashImage: React.FC<{ rotationInterval?: number }> = ({ rotationInterval = 5000 }) => {
  // Use the hard-coded FILENAMES array to build an array of SplashMovie objects.
  const movies: SplashMovie[] = FILENAMES.map((filename) => {
    const title = filename.replace(/\.jpg$/i, "");
    return { title, filename };
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (movies.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
      }, rotationInterval);
      return () => clearInterval(timer);
    }
  }, [movies, rotationInterval]);

  if (movies.length === 0) return null;

  const currentMovie = movies[currentIndex];
  const backgroundImageUrl = `/HomeBackground/${currentMovie.filename}`;

  return (
    <div
      className="splash-image"
      style={{
        width: '100%',
        height: '600px',
        background: `url(${backgroundImageUrl}) center/cover no-repeat`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}
      />
      <div style={{ zIndex: 1, textAlign: 'center', padding: '20px', position: 'absolute', bottom: '20px', width: '100%' }}>
        <h1>{currentMovie.title}</h1>
      </div>
    </div>
  );
};

export default SplashImage;

