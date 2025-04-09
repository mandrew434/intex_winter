import { Movie } from "../types/Movie";

interface FetchMoviesResponse {
    movies: Movie[];
    totalNumMovies: number;
}

    const API_URL = 'https://localhost:5000/api/Movie';
    const url = 'https://localhost:5000/api/Movies/all';

export const fetchMovies = async (   
    // pageSize: number,
    // pageNum: number,
    // selectedCategories: string[]
): Promise<FetchMoviesResponse> => {
    try{
    // const [sortBy, setSortBy] = useState('');
    // const categoryParams = selectedCategories
    // .map((cat) => `mvoieCategories=${encodeURIComponent(cat)}`)
    // .join('&');

    // const url = `${API_URL}/all?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ``}`// +
    //             // (sortBy ? `&sortBy=${sortBy}` : '');

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch movies');
    }

    return await response.json();
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

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
        console.error("Error adding movie:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

export const updateMovie = async (showId: number, updatedMovie: Movie) : Promise<Movie> => {
    try {
        const response = await fetch(`${API_URL}/UpdateMovie/${showId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedMovie),
        });

        return await response.json();
    } catch (error) {
        console.error('Error updating movie:', error);
        throw error;
    }
};

export const deleteMovie = async (showId: number): Promise<void> => {
    try {
        const response = await fetch (`${API_URL}/DeleteMovie/${showId}`,
            {
                method: 'DELETE'
            }
        );

        if (!response.ok) {
            throw new Error('Failed to delete movie');
        }
    } catch (error) {
        console.error('Error deleting movie:,', error);
        throw error;
    }
}