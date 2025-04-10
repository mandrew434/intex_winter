// AdminMoviesTable.tsx
import React, { useState, useEffect } from 'react';
import { Movie } from '../types/Movie';
import AdminMoviesTableHeader from './AdminMoviesTableHeader';
import AdminMoviesTableRow from './AdminMoviesTableRow';

const AdminMoviesTable: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;
  const maxPageButtons = 10; // maximum page buttons to show

  // Fetch movies from the API endpoint.
  useEffect(() => {
    fetch('https://intex-winter-backend-had2hmbubbgfczd8.eastus-01.azurewebsites.net/api/movie/all')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        return response.json();
      })
      .then((data: Movie[]) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Reset the current page whenever the movies array changes.
  useEffect(() => {
    setCurrentPage(1);
  }, [movies]);

  const handleUpdate = (updatedMovie: Movie) => {
    // TODO: Send an API request to update the movie in your database.
    setMovies((prev) =>
      prev.map((m) => (m.showId === updatedMovie.showId ? updatedMovie : m))
    );
  };

  const handleDelete = (showId: string) => {
    // TODO: Send an API request to delete the movie.
    setMovies((prev) => prev.filter((m) => m.showId !== showId));
  };

  if (loading) {
    return <div className="container mt-4">Loading movies...</div>;
  }
  if (error) {
    return <div className="container mt-4">Error: {error}</div>;
  }

  // Calculate pagination values.
  const totalPages = Math.ceil(movies.length / pageSize);
  const currentMovies = movies.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Determine pagination window.
  const half = Math.floor(maxPageButtons / 2);
  let startPage = Math.max(1, currentPage - half);
  let endPage = startPage + maxPageButtons - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mt-4">
      <h1>Admin Movies</h1>
      <table className="table table-striped table-bordered">
        <AdminMoviesTableHeader />
        <tbody>
          {currentMovies.map((movie) => (
            <AdminMoviesTableRow
              key={movie.showId}
              movie={movie}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <nav>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
              Previous
            </button>
          </li>

          {pageNumbers.map((page) => (
            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(page)}>
                {page}
              </button>
            </li>
          ))}

          {endPage < totalPages && (
            <li className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          )}

          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminMoviesTable;
