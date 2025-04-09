import React, { useState, useEffect, useRef, useCallback } from 'react';
import MovieCard from '../components/MovieCard';
import { Movie } from '../types/Movie';

const AllMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const loader = useRef<HTMLDivElement | null>(null);

  // Function to fetch movies from your backend
  const loadMovies = useCallback(async () => {
    try {
      // Modify the endpoint and query parameter (page) according to your API
    //   const response = await fetch(`/api/movies?page=${page}`);
    const response = await fetch(`https://localhost:5000/api/Movie/all`);
      const data = await response.json();
      
      // Assuming your API returns an object with a "movies" array property
      if (data && data.length > 0) {
        setMovies((prevMovies) => [...prevMovies, ...data]);
        setPage((prevPage) => prevPage + 1);
      } else {
        // No more movies to load
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }, [page]);

  // Initial load on mount
  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

//   // Set up IntersectionObserver for infinite scrolling
//   useEffect(() => {
//     if (!loader.current) return;
//     const observer = new IntersectionObserver(
//       (entries) => {

//         entries.forEach((entry) => {
//             console.log(
//               `Intersection Observer Triggered: isIntersecting=${entry.isIntersecting}, intersectionRatio=${entry.intersectionRatio}`
//             );
//         });

//         if (entries[0].isIntersecting && hasMore) {
//           loadMovies();
//         }
//       },
//       { threshold: .75 }
//     );
//     observer.observe(loader.current);
//     return () => {
//       if (loader.current) observer.unobserve(loader.current);
//     };
//   }, [loader, hasMore, loadMovies]);

  return (
    <div className="container my-4">
      <div className="row">
        {movies.map((movie) => (
          <div 
            className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4" 
            key={movie.showId} // Ensure that your Movie type has a unique "id"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
      {/* Loader div observed by IntersectionObserver */}
      {hasMore ? (
        <div ref={loader} style={{ textAlign: 'center', padding: '20px' }}>
          <p>Loading more movies...</p>
        </div>
      ) : (
        <p style={{ textAlign: 'center', padding: '20px' }}>No more movies to load.</p>
      )}
    </div>
  );
};

export default AllMoviesPage;
