import { useEffect, useState } from 'react';
import { CollaborativeRec } from '../types/CollaborativeRec';
import { Movie } from '../types/Movie';
import MovieCarousel from './MovieCarousel';

interface CollaborativeTestProps {
  userId: number;
}

const CollaborativeTest: React.FC<CollaborativeTestProps> = ({ userId }) => {
  const COLLAB_REC_API_BASE =
    'https://intex-winter-backend-had2hmbubbgfczd8.eastus-01.azurewebsites.net/api/CollaborativeRecs';
  const MOVIE_DETAILS_API_BASE =
    'https://intex-winter-backend-had2hmbubbgfczd8.eastus-01.azurewebsites.net/api/Movie/moviedetails';

  // State for the collaborative recommendations.
  const [collabRec, setCollabRec] = useState<CollaborativeRec | null>(null);
  // Instead of a single movies array, store movies grouped by genre.
  const [moviesByGenre, setMoviesByGenre] = useState<{ [genre: string]: Movie[] }>({});
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
  const fetchMoviesInBatches = async (ids: string[], batchSize = 100): Promise<Movie[]> => {
    const movies: Movie[] = [];
    for (let i = 0; i < ids.length; i += batchSize) {
      const batch = ids.slice(i, i + batchSize);
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
      'comedies',
      'thrillers',
      'familyMovies',
      'dramasRomanticMovies',
      'documentaries',
      'adventure',
      'animeSeriesInternationalTVShows',
      'britishTVShowsDocuseriesInternationalTVShows',
      'children',
      'comediesDramasInternationalMovies',
      'comediesInternationalMovies',
      'comediesRomanticMovies',
      'crimeTVShowsDocuseries',
      'documentariesInternationalMovies',
      'docuseries',
      'dramas',
      'dramasInternationalMovies',
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
    ];

    setLoadingMovies(true);

    const fetchPromises = genres.map((genre) => {
      const recsForGenre = (collabRec[genre as keyof CollaborativeRec] as string[]) || [];
      if (recsForGenre.length === 0) {
        return Promise.resolve({ genre, movies: [] });
      }
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

  // Helper function to convert a raw genre key into normal English
  const prettyGenreName = (genre: string): string => {
    // 1. Insert space before each uppercase letter
    // 2. Merge "T V" => "TV"
    // 3. Capitalize each word
    const spaced = genre.replace(/([A-Z])/g, ' $1').trim().replace(/\bT V\b/g, 'TV');
    // 'animeSeriesInternationalTVShows' => 'anime Series International T V Shows' => 'anime Series International TV Shows'
    return spaced
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (!collabRec) {
    return <div>Loading collaborative recommendations…</div>;
  }

  return (
    <div>
      <h2>Your Recommendations</h2>
      {loadingMovies && <p>Loading movie details…</p>}
      {Object.entries(moviesByGenre).map(([genre, movies]) => (
        <div key={genre}>
          <MovieCarousel title={`Suggested ${prettyGenreName(genre)}`} movies={movies} />
        </div>
      ))}
    </div>
  );
};

export default CollaborativeTest;
