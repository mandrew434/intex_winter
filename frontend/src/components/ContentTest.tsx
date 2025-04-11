// src/components/ContentTest.tsx
import React, { useState } from 'react';
import { ContentRec } from '../types/ContentRec';
import { Movie } from '../types/Movie';
import MovieCarousel from './MovieCarousel';

const REC_API_BASE = 'https://intex-winter-backend-2-b0cjguhaejd7hxap.westus2-01.azurewebsites.net/api/ContentRec';
const MOVIE_DETAILS = 'https://intex-winter-backend-2-b0cjguhaejd7hxap.westus2-01.azurewebsites.net/api/Movie/moviedetails';

const ContentTest: React.FC = () => {
  const [showId, setShowId] = useState('');
  const [recData, setRecData] = useState<ContentRec | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    if (!showId) return;
    setLoading(true);
    setError(null);
    setRecData(null);
    setMovies([]);

    try {
      // 1) fetch the rec list
      const recRes = await fetch(
        `${REC_API_BASE}/${encodeURIComponent(showId)}`,
        { headers: { Accept: 'application/json' } }
      );
      if (!recRes.ok) {
        throw new Error(`Rec fetch failed (${recRes.status})`);
      }

      const fetchedRec = (await recRes.json()) as ContentRec;
      setRecData(fetchedRec);

      // 2) drop the returned showId and keep only rec1…recN in order
      const { showId: _, ...onlyRecs } = fetchedRec;
      const recIds = Object.values(onlyRecs);

      // 3) fetch details for each rec
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

      // 4) wait for them all
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

      {recData && movies.length > 0 && (
        <MovieCarousel title={`You might also like:”`} movies={movies} />
      )}
    </div>
  );
};

export default ContentTest;

