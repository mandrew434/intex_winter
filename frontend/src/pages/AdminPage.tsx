// AdminPage.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types/Movie';
import AdminMoviesTableHeader from '../components/AdminMoviesTableHeader';
import AdminMoviesTableRow from '../components/AdminMoviesTableRow';

const AdminPage: React.FC = () => {
  // State for movies, loading, error and pagination.
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;
  const maxPageButtons = 10; // Maximum page buttons to display.

  // Fetch movies from your API.
  useEffect(() => {
    fetch('https://localhost:5000/api/Movie/all')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        return response.json();
      })
      .then((data: Movie[]) => {
        setMovies(data);
        setLoading(false);
        setCurrentPage(1);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Inline update: update an existing movie.
  const handleUpdate = (updatedMovie: Movie) => {
    setMovies((prev) =>
      prev.map((m) => (m.showId === updatedMovie.showId ? updatedMovie : m))
    );
  };

  // Inline delete: remove a movie.
  const handleDelete = (showId: string) => {
    setMovies((prev) => prev.filter((m) => m.showId !== showId));
  };

  // Pagination calculations.
  const totalPages = Math.ceil(movies.length / pageSize);
  const currentMovies = movies.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Calculate the window of page numbers to display.
  const half = Math.floor(maxPageButtons / 2);
  let startPage = Math.max(1, currentPage - half);
  let endPage = startPage + maxPageButtons - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }
  const pageNumbers: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div className="container mt-4">Loading movies...</div>;
  }
  if (error) {
    return <div className="container mt-4">Error: {error}</div>;
  }

  return (
    <div className="container mt-4">
      <h1>Admin Movies</h1>
      
      {/* Add Movie Button that navigates to AddMoviePage */}
      <div className="mb-3">
        <Link to="/admin/add" className="btn btn-success">
          Add Movie
        </Link>
      </div>

      {/* Movies Table */}
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
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
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
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminPage;
