import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CollaborativeRec } from '../types/CollaborativeRec';
import { Movie } from '../types/Movie';
import MovieCard from './MovieCard';

const COLLAB_REC_API_BASE = 'https://localhost:5000/api/CollaborativeRecs';
const MOVIE_DETAILS_API_BASE = 'https://localhost:5000/api/Movie/moviedetails';

const genre_i_want = 'Action'; // Example genre, replace with your own logic

const CollaborativeTest: React.FC = () => {
  // State for the collaborative recommendations.
  const [collabRec, setCollabRec] = useState<CollaborativeRec | null>(null);
  // State for the detailed movies fetched based on the recommendation IDs.
  const [movies, setMovies] = useState<Movie[]>([]);
  // State to track loading state for fetching movie details.
  const [loadingMovies, setLoadingMovies] = useState(false);

  const userId = 1;
  const navigate = useNavigate();

  // Fetch collaborative recommendation data on mount.
  useEffect(() => {
    fetch(`${COLLAB_REC_API_BASE}/${userId}`)
      .then((res) => res.json())
      .then(setCollabRec)
      .catch(console.error);
  }, [userId]);

  // Once we have the collaborative recommendation, fetch each movie's details.
  useEffect(() => {
    if (!collabRec) return;
    // Assume collabRec.action is an array of movie IDs.
    const actionRecs = collabRec.action || [];
    if (actionRecs.length === 0) return;

    setLoadingMovies(true);

    // Create an array of promises to fetch movie details in parallel.
    const moviePromises = actionRecs.map((id) =>
      fetch(`${MOVIE_DETAILS_API_BASE}/${encodeURIComponent(id)}`, {
        headers: { Accept: 'application/json' },
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Movie ${id} fetch failed (${res.status})`);
        }
        return res.json() as Promise<Movie>;
      })
    );

    Promise.all(moviePromises)
      .then((fetchedMovies) => setMovies(fetchedMovies))
      .catch((err) => console.error(err))
      .finally(() => setLoadingMovies(false));
  }, [collabRec]);

  // Show a loading state if collaborative recommendations haven't been loaded yet.
  if (!collabRec) return <div>Loading collaborative recommendations…</div>;

  // // Extract the first action item for display purposes.
  // const firstAction = collabRec.action?.[0] ?? '—';
  // const actionRecs = collabRec.action || [];

  // // Local click handler to navigate to a single movie's detail page.
  // const handleClick = (movieId: string) => {
  //   console.log(`Navigating to MovieDetailsPage for showId: ${movieId}`);
  //   navigate(`/moviedetails/${movieId}`);
  // };

  return (
    <div>
      <h2>User {collabRec.userId} Recommendations</h2>

      {/* Optionally show a loading message while fetching movie details */}
      {loadingMovies && <p>Loading movie details…</p>}

      {/* Once movies have been fetched, display them using MovieCard */}
      {movies.length > 0 && (
        <div>
          <h3>Movie Details</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {movies.map((movie) => (
              <MovieCard key={movie.showId} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaborativeTest;
