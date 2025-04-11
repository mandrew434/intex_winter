// src/components/ContentRecCarousel.tsx
import React, { useState, useEffect } from 'react';
import { ContentRec } from '../types/ContentRec';
import { Movie } from '../types/Movie';
import MovieCarousel from './MovieCarousel';

const REC_API_BASE = 'https://localhost:5000/api/ContentRec';
const MOVIE_DETAILS = 'https://localhost:5000/api/Movie/moviedetails';

interface ContentRecCarouselProps {
  showId: string;
}

const ContentRecCarousel: React.FC<ContentRecCarouselProps> = ({ showId }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!showId) return;

    let cancelled = false;
    const fetchRecsAndMovies = async () => {
      setLoading(true);
      setError(null);
      setMovies([]);

      try {
        // 1) fetch rec list
        const recRes = await fetch(
          `${REC_API_BASE}/${encodeURIComponent(showId)}`,
          { headers: { Accept: 'application/json' } }
        );
        if (!recRes.ok) {
          throw new Error(`Rec fetch failed (${recRes.status})`);
        }
        const fetchedRec = (await recRes.json()) as ContentRec;

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

        if (!cancelled) {
          setMovies(fetchedMovies);
        }
      } catch (err: any) {
        console.error(err);
        if (!cancelled) {
          setError(err.message || 'Unknown error');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchRecsAndMovies();

    return () => {
      cancelled = true;
    };
  }, [showId]);

  if (loading) return <div>Loading recommendations…</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (movies.length === 0) return <div>No recommendations found.</div>;

  return <MovieCarousel title={`You might also like:`} movies={movies} />;
};

export default ContentRecCarousel;
