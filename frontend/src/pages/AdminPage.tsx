import { SetStateAction, useEffect, useState } from "react";
import { Movie } from "../types/Movie";
// import { deleteMovie, fetchMovies } from "../api/MoviesAPI";
// import Pagination from "../components/Pagination";
import NewMovieForm from "../components/NewMovieForm";
import EditMovieForm from "../components/EditMovieForm";
import { fetchMovies } from "../api/MoviesAPI";

const AdminPage: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);
  
    useEffect(() => {
      const fetchMovies = async () => {
        const response = await fetch(`https://localhost:5000/api/Movie/all`);
        const movieData = await response.json();
        setMovies(movieData);
      };
  
      fetchMovies();
    }, []);

// const AdminPage = () => {
//     const [movies, setMovies] = useState<Movie[]>([]);
//     const [error, setError] = useState<string | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [pageSize, setPageSize] = useState<number>(10);
//     const [pageNum, setPageNum] = useState<number>(1);
//     const [totalPages, setTotalPages] = useState<number>(0);
//     const [showForm, setShowForm] = useState<boolean>(false);
//     const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
    
//     useEffect(() => {
//         const loadMovies = async () => {
//             try {
//                 const data = await fetchMovies(pageSize, pageNum, []);
//                 setMovies(data.movies);
//                 setTotalPages(Math.ceil(data.totalNumMovies / pageSize));
//             } catch (error) {
//                 setError((error as Error).message);
//             } finally{
//                 setLoading(false);
//             }
//         };

//         loadMovies();
//     }, [pageSize, pageNum]);

    // const handleDelete = async (showId: string) => {
    //     const confirmDelete = window.confirm('Are you sure you want to delete this movie?');
    //     if (!confirmDelete) return;

    //     try {
    //         await deleteMovie(Number(showId));
    //         setMovies(movies.filter((m) => m.showId !== showId))
    //     } catch (error) {
    //     alert('Failed to delete movie. Please try again.')
    //     }
    // };

    // if (loading) return <p>Loading movies...</p>;
    // if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div>
            <h1>Admin - Movies</h1>

                {!showForm && (
                    <button 
                        className="btn btn-success mb-3" 
                        onClick={() => setShowForm(true)}
                    >Add Movie</button> 
                )}

                {showForm && (
                    <NewMovieForm
                        onSuccess={() => {
                            setShowForm(false); 
                        //     fetchMovies(pageSize,pageNum, []).then((data) => 
                        //         setMovies(data.movies)
                        // );
                    }}
                    onCancel={() => setShowForm(false)}
                  />
                )}

                {/* {!showForm && (
                    <button 
                        className="btn btn-success mb-3" 
                        onClick={() => setShowForm(true)}
                    >Add Movie</button> 
                )}

                {showForm && (
                    <NewMovieForm 
                        onSuccess={() => {
                            setShowForm(false); 
                            fetchMovies(pageSize,pageNum, []).then((data) => 
                                setMovies(data.movies)
                        );
                    }}
                    onCancel={() => setShowForm(false)}
                  />
                )} */}

                {editingMovie && (
                    <EditMovieForm movie={editingMovie} onSuccess={() => {
                        setEditingMovie(null);
                        // fetchMovies(pageSize, pageNum,[]).then((data) => setMovies(data.movies));
                    }}
                    onCancel={() => setEditingMovie(null)}
                    />
                )} 

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th></th>
                        <th>Show ID</th>
                        <th>Type</th>
                        <th>Title</th>
                        <th>Director</th>
                        <th>Cast</th>
                        <th>Country</th>
                        <th>Release Year</th>
                        <th>Rating</th>
                        <th>Duration</th>
                        <th>Description</th>
                        <th>Duration Number</th>
                        <th>Action</th>
                        <th>Adventure</th>
                        <th>Anime Series International TV Shows</th>
                        <th>British TV Shows Docuseries International TV Shows</th>
                        <th>Children</th>
                        <th>Comedies</th>
                        <th>Comedies Dramas International Movies</th>
                        <th>Comedies International Movies</th>
                        <th>Comedies Romantic Movies</th>
                        <th>Crime TV Shows Docuseries</th>
                        <th>Documentaries</th>
                        <th>Documentaries International Movies</th>
                        <th>Docuseries</th>
                        <th>Dramas</th>
                        <th>Dramas International Movies</th>
                        <th>Dramas Romantic Movies</th>
                        <th>Family Movies</th>
                        <th>Fantasy</th>
                        <th>Horror Movies</th>
                        <th>International Movies Thrillers</th>
                        <th>International TV Shows Romantic TV Shows TV Dramas</th>
                        <th>Kids TV</th>
                        <th>Language TV Shows</th>
                        <th>Musicals</th>
                        <th>Nature TV</th>
                        <th>Reality TV</th>
                        <th>Spirituality</th>
                        <th>TV Action</th>
                        <th>TV Comedies</th>
                        <th>TV Dramas</th>
                        <th>Talk Shows TV Comedies</th>
                        <th>Thrillers</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {movies.map((m) => (               
                        <tr key={m.showId}>
                            <td><button className="btn btn-primary btn-sm w-100 mb-1">Edit</button>
                            <button 
                            className="btn btn-danger btn-sm w-100">
                                Delete
                            </button></td>
                            <td>{m.showId}</td>
                            <td>{m.type}</td>
                            <td>{m.title}</td>
                            <td>{m.director}</td>
                            <td>{m.cast}</td>
                            <td>{m.country}</td>
                            <td>{m.releaseYear}</td>
                            <td>{m.rating}</td>
                            <td>{m.duration}</td>
                            <td>{m.description}</td>
                            <td>{m.durationNum}</td>
                            <td>{m.action}</td>
                            <td>{m.adventure}</td>
                            <td>{m.animeSeriesInternationalTvShows}</td>
                            <td>{m.britishTvShowsDocuseriesInternationalTvShows}</td>
                            <td>{m.children}</td>
                            <td>{m.comedies}</td>
                            <td>{m.comediesDramasInternationalMovies}</td>
                            <td>{m.comediesInternationalMovies}</td>
                            <td>{m.comediesRomanticMovies}</td>
                            <td>{m.crimeTvShowsDocuseries}</td>
                            <td>{m.documentaries}</td>
                            <td>{m.documentariesInternationalMovies}</td>
                            <td>{m.docuseries}</td>
                            <td>{m.dramas}</td>
                            <td>{m.dramasInternationalMovies}</td>
                            <td>{m.dramasRomanticMovies}</td>
                            <td>{m.familyMovies}</td>
                            <td>{m.fantasy}</td>
                            <td>{m.horrorMovies}</td>
                            <td>{m.internationalMoviesThrillers}</td>
                            <td>{m.internationalTvShowsRomanticTvShowsTvDramas}</td>
                            <td>{m.kidsTv}</td>
                            <td>{m.languageTvShows}</td>
                            <td>{m.musicals}</td>
                            <td>{m.natureTv}</td>
                            <td>{m.realityTv}</td>
                            <td>{m.spirituality}</td>
                            <td>{m.tvAction}</td>
                            <td>{m.tvComedies}</td>
                            <td>{m.tvDramas}</td>
                            <td>{m.talkShowsTvComedies}</td>
                            <td>{m.thrillers}</td>

                            <td>
                                {/* <button className="btn btn-primary btn-sm w-100 mb-1" onClick={() => setEditingMovie(m)}>Edit</button> */}
                                {/* <button 
                                className="btn btn-danger btn-sm w-100" 
                                onClick={() => handleDelete(m.showId)}
                                >
                                    Delete
                                </button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* <Pagination 
                currentPage={pageNum}
                totalPages={totalPages}
                pageSize={pageSize}
                // onPageChange={setPageNum}
                onPageChange={(newPage: number) => setPageNum(newPage)}
                onPageSizeChange={(newSize: SetStateAction<number>) => {
                    setPageSize(newSize);
                    setPageNum(1); // Reset to first page when page size changes
                }}
            /> */}
        </div>

    )
};

export default AdminPage;