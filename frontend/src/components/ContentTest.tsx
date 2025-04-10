// src/components/ContentTest.tsx
import React, { useState } from 'react';
import { ContentRec } from '../types/ContentRec';
import { Movie } from '../types/Movie';
import MovieCard from './MovieCard';

const REC_API_BASE = 'https://localhost:5000/api/ContentRec';
const MOVIE_DETAILS = 'https://localhost:5000/api/Movie/moviedetails';

const ContentTest: React.FC = () => {
  const [showId, setShowId] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    if (!showId) return;
    setLoading(true);
    setError(null);
    setMovies([]);

    try {
      // 1) Fetch your rec list
      const recRes = await fetch(
        `${REC_API_BASE}/${encodeURIComponent(showId)}`,
        {
          headers: { Accept: 'application/json' },
        }
      );
      if (!recRes.ok) {
        throw new Error(`Rec fetch failed (${recRes.status})`);
      }
      const recData = (await recRes.json()) as ContentRec;

      // 2) Extract & sort rec IDs
      const recIds = (Object.entries(recData) as [keyof ContentRec, string][])
        .filter(([key]) => key.startsWith('rec'))
        .sort(([a], [b]) => parseInt(a.slice(3), 10) - parseInt(b.slice(3), 10))
        .map(([, id]) => id);

      // 3) Fetch details for each movie ID in parallel
      const moviePromises = recIds.map((id) =>
        fetch(`${MOVIE_DETAILS}/${encodeURIComponent(id)}`, {
          headers: { Accept: 'application/json' },
        }).then((res) => {
          if (!res.ok) {
            throw new Error(`Movie ${id} fetch failed (${res.status})`);
          }
          return res.json() as Promise<Movie>;
        })
      );

      // 4) Await them all and set state
      const fetchedMovies = await Promise.all(moviePromises);
      setMovies(fetchedMovies);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <h3>Load Content Recommendations</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Enter showId (e.g. s1)"
          value={showId}
          onChange={(e) => setShowId(e.target.value)}
          style={{ flex: 1 }}
        />
        <button onClick={handleFetch} disabled={loading || !showId}>
          {loading ? 'Loading…' : 'Fetch'}
        </button>
      </div>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {movies.length > 0 && (
        <>
          <h4>Recommendations for “{showId}”</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {movies.map((movie) => (
              <MovieCard key={movie.showId} movie={movie} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ContentTest;
