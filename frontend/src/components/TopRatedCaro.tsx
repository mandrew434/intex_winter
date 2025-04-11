import { useState, useEffect } from 'react';
import MovieCarousel from './MovieCarousel';

const TopRatedCaro = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const res = await fetch('https://localhost:5000/api/Movie/top-rated', {
          method: 'GET',
          credentials: 'include', // if you're using cookie auth
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json(); // parse the JSON array
        setMovies(data); // store it in state
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchRecs();
  }, []);

  if (loading) return <div>Loading recommendations…</div>;
  if (error) return <div>Error: {error.message}</div>;

  // once we have the array, pass it straight into your carousel
  return <MovieCarousel movies={movies} title={'Top Rated Shows'} />;
};

export default TopRatedCaro;
