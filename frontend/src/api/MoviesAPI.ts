// MoviesAPI.ts
import { Movie } from '../types/Movie';

export interface FetchMoviesResponse {
  movies: Movie[];
  totalNumMovies: number;
}

const API_URL = 'https://localhost:5000/api/movie';

/**
 * Fetches all movies.
 * Note: If you later add parameters (page size, page number, filters, etc.), you can modify the URL.
 */
export const fetchMovies = async (): Promise<FetchMoviesResponse> => {
  try {
    const response = await fetch(`${API_URL}/all`);
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    // Assuming the API returns an array of movies.
    const movies: Movie[] = await response.json();
    return { movies, totalNumMovies: movies.length };
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

/**
 * Retrieves detailed information for a single movie identified by showId.
 */
export const getMovieDetails = async (showId: string): Promise<Movie> => {
  try {
    const response = await fetch(
      `${API_URL}/moviedetails/${encodeURIComponent(showId)}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

/**
 * Adds a new movie to the backend.
 */
export const addMovie = async (movie: Movie): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/AddMovie`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    });
    if (!response.ok) {
      throw new Error('Failed to add movie');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding movie:', error);
    throw error;
  }
};

/**
 * Updates an existing movie.
 * @param showId - The identifier of the movie to update.
 * @param updatedMovie - The movie data to update.
 */
export const updateMovie = async (
  showId: string,
  updatedMovie: Movie
): Promise<Movie> => {
  try {
    const response = await fetch(
      `${API_URL}/UpdateMovie/${encodeURIComponent(showId)}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMovie),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to update movie');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating movie:', error);
    throw error;
  }
};

/**
 * Deletes a movie from the backend.
 * @param showId - The identifier of the movie to delete.
 */
export const deleteMovie = async (showId: string): Promise<void> => {
  try {
    console.log(
      'Deleting movie with showId:',
      `${API_URL}/DeleteMovie/${encodeURIComponent(showId)}`
    ); // Debugging line
    const response = await fetch(
      `${API_URL}/DeleteMovie/${encodeURIComponent(showId)}`,
      {
        method: 'DELETE',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to delete movie');
    }
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
};
