import { useEffect, useState } from 'react';
import { CollaborativeRec } from '../types/CollaborativeRec';
import { Movie } from '../types/Movie';
import MovieCarousel from './MovieCarousel';

interface CollaborativeTestProps {
  userId: number;
}

const CollaborativeTest: React.FC<CollaborativeTestProps> = ({ userId }) => {
  const COLLAB_REC_API_BASE = 'https://localhost:5000/api/CollaborativeRecs';
  const MOVIE_DETAILS_API_BASE =
    'https://localhost:5000/api/Movie/moviedetails';

  // State for the collaborative recommendations.
  const [collabRec, setCollabRec] = useState<CollaborativeRec | null>(null);
  // Instead of a single movies array, store movies grouped by genre.
  const [moviesByGenre, setMoviesByGenre] = useState<{
    [genre: string]: Movie[];
  }>({});
  // State to track loading for fetching movie details.
  const [loadingMovies, setLoadingMovies] = useState(false);

  // Fetch collaborative recommendation data on mount.
  useEffect(() => {
    fetch(`${COLLAB_REC_API_BASE}/${userId}`)
      .then((res) => res.json())
      .then(setCollabRec)
      .catch(console.error);
  }, [userId]);

  // Helper function to fetch movies in batches.
  const fetchMoviesInBatches = async (
    ids: string[],
    batchSize = 100
  ): Promise<Movie[]> => {
    const movies: Movie[] = [];
    for (let i = 0; i < ids.length; i += batchSize) {
      // Get the current batch of IDs.
      const batch = ids.slice(i, i + batchSize);
      // Map each ID to a fetch promise.
      const batchPromises = batch.map((id) =>
        fetch(`${MOVIE_DETAILS_API_BASE}/${encodeURIComponent(id)}`, {
          headers: { Accept: 'application/json' },
        }).then((res) => {
          if (!res.ok) {
            throw new Error(`Movie ${id} fetch failed (${res.status})`);
          }
          return res.json() as Promise<Movie>;
        })
      );
      // Wait for the current batch of fetches to complete.
      const batchMovies = await Promise.all(batchPromises);
      console.log(`Batch fetched: ${batchMovies.length} movies`);
      movies.push(...batchMovies);
    }
    return movies;
  };

  // Once we have the collaborative recommendations, fetch each movie's details for each genre.
  useEffect(() => {
    if (!collabRec) return;

    // Define the genres you want to display.
    const genres = [
      'action',
      'adventure',
      'animeSeriesInternationalTVShows',
      'britishTVShowsDocuseriesInternationalTVShows',
      'children',
      'comedies',
      'comediesDramasInternationalMovies',
      'comediesInternationalMovies',
      'comediesRomanticMovies',
      'crimeTVShowsDocuseries',
      'documentaries',
      'documentariesInternationalMovies',
      'docuseries',
      'dramas',
      'dramasInternationalMovies',
      'dramasRomanticMovies',
      'familyMovies',
      'fantasy',
      'horrorMovies',
      'internationalMoviesThrillers',
      'internationalTVShowsRomanticTVShowsTVDramas',
      'kidsTV',
      'languageTVShows',
      'musicals',
      'natureTV',
      'realityTV',
      'spirituality',
      'tvAction',
      'tvComedies',
      'tvDramas',
      'talkShowsTVComedies',
      'thrillers',
    ];

    setLoadingMovies(true);

    // For each genre, extract movie IDs and fetch movie details in batches.
    const fetchPromises = genres.map((genre) => {
      const recsForGenre =
        (collabRec[genre as keyof CollaborativeRec] as string[]) || [];
      if (recsForGenre.length === 0) {
        // If no recommendations for this genre, resolve with an empty array.
        return Promise.resolve({ genre, movies: [] });
      }
      // Fetch movie details in batches.
      return fetchMoviesInBatches(recsForGenre, 10).then((movies) => ({
        genre,
        movies,
      }));
    });

    Promise.all(fetchPromises)
      .then((results) => {
        const moviesObj: { [genre: string]: Movie[] } = {};
        results.forEach(({ genre, movies }) => {
          moviesObj[genre] = movies;
        });
        setMoviesByGenre(moviesObj);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingMovies(false));
  }, [collabRec]);

  // Show a loading state if collaborative recommendations haven't been loaded yet.
  if (!collabRec) {
    return <div>Loading collaborative recommendations…</div>;
  }

  return (
    <div>
      <h2>Your Recommendations</h2>
      <p>User {collabRec.userId} - delete later</p>
      <p>-- We think you'll love some of these shows --</p>
      {loadingMovies && <p>Loading movie details…</p>}
      {/* Render a separate MovieCarousel per genre */}
      {Object.entries(moviesByGenre).map(([genre, movies]) => (
        <div key={genre}>
          <MovieCarousel title={`Suggested ${genre}`} movies={movies} />
        </div>
      ))}
    </div>
  );
};

export default CollaborativeTest;

