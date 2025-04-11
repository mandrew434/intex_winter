// AdminPage.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types/Movie';
import AdminMoviesTableHeader from '../components/AdminMoviesTableHeader';
import AdminMoviesTableRow from '../components/AdminMoviesTableRow';
import { updateMovie, deleteMovie } from '../api/MoviesAPI';
import AuthorizeView from '../components/AuthorizeView';
import { useNavigate } from 'react-router-dom';

const AdminPage: React.FC = () => {
  // State for movies, loading, error, pagination and search.
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>(""); // Added search state
  const pageSize = 10;
  const maxPageButtons = 10; // Maximum page buttons to display.
  const navigate = useNavigate();

  // Fetch movies from your API.
  useEffect(() => {
    fetch('https://intex-winter-backend-2-b0cjguhaejd7hxap.westus2-01.azurewebsites.net/api/movie/all')
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

  // Called when an update is made to an existing movie.
  const handleUpdate = async (updatedMovie: Movie) => {
    try {
      const result = await updateMovie(updatedMovie.showId, updatedMovie);
      // Update local state only if the update was successful
      setMovies((prev) =>
        prev.map((m) => (m.showId === result.showId ? result : m))
      );
    } catch (error) {
      console.error('Error updating movie:', error);
      // Optionally handle the error (e.g., show a message to the user)
    }
  };

  // // Called when a movie is to be deleted.
  // const handleDelete = async (showId: string) => {
  //   try {
  //     await deleteMovie(showId);
  //     // Update the state to remove the deleted movie.
  //     setMovies((prev) => prev.filter((m) => m.showId !== showId));
  //   } catch (error) {
  //     console.error('Error deleting movie:', error);
  //     // Optionally handle the error (e.g., show a message to the user)
  //   }
  // };

  
const handleDelete = async (showId: string) => {
  // Ask for confirmation from the user.
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this movie? This action cannot be undone."
  );
  
  if (confirmDelete) {
    try {
      await deleteMovie(showId);
      // Update your state to remove the deleted movie.
      setMovies((prev) => prev.filter((m) => m.showId !== showId));
      // Redirect the user back to the admin page.
      navigate('/admin');
    } catch (error) {
      console.error('Error deleting movie:', error);
      // Optionally add code here to display an error message to the user.
    }
  }
};

  // Filter movies based on the search input (filter by title).
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  // Reset current page if the filteredMovies change.
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Pagination calculations using filteredMovies.
  const totalPages = Math.ceil(filteredMovies.length / pageSize);
  const currentMovies = filteredMovies.slice(
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

  // Handler to navigate to the "All Movies" page.
  const handleBack = () => {
    navigate('/movies');
  };

  return (
    <AuthorizeView>
    <div className="container mt-4">
    <button
        type="button"
        onClick={handleBack}
        style={{
          position: 'fixed',
          top: '20px',
          left: '130px',
          padding: '10px 20px',
          backgroundColor: '#007bff',  // Same blue background as Logout.
          color: '#fff',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          zIndex: 1000,
          transition: 'background-color 0.3s ease',
        }}
        onMouseOver={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#0056b3';
        }}
        onMouseOut={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#007bff';
        }}
      >
        &larr; Back to Home Page
      </button>
      <h1>Admin Movies</h1>

      {/* Add Movie Button */}
      <div className="mb-3">
        <Link to="/admin/add" className="btn btn-success">
          Add Movie
        </Link>
      </div>
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: "10px",
          padding: "5px",
          width: "100%",
          maxWidth: "300px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      {/* Movies Table */}
      <table className="table table-striped table-bordered">
        <AdminMoviesTableHeader />
        <tbody>
          {currentMovies.length === 0 ? (
            <tr>
              <td colSpan={100}>No matching movies found.</td>
            </tr>
          ) : (
            currentMovies.map((movie) => (
              <AdminMoviesTableRow
                key={movie.showId}
                movie={movie}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))
          )}
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
    </AuthorizeView>
  );
};

export default AdminPage;
