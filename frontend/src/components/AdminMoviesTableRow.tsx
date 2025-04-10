// AdminMoviesTableRow.tsx
import React, { useState, useEffect } from 'react';
import { Movie } from '../types/Movie';
import { mainGenres, getCombinedGenres, GenreGroup } from '../types/mainGenres';

interface AdminMoviesTableRowProps {
  movie: Movie;
  onUpdate: (updatedMovie: Movie) => void;
  onDelete: (showId: string) => void;
}

// Define an inline type for genre options.
interface GenreOption {
  value: string;
  label: string;
}

// Define a constant array for genre options.
const genreOptions: GenreOption[] = [
  { value: 'action', label: 'Action' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'animeSeriesInternationalTvShows', label: 'Anime Series / International TV Shows' },
  { value: 'britishTvShowsDocuseriesInternationalTvShows', label: 'British TV Shows / Docuseries / International TV Shows' },
  { value: 'children', label: 'Children' },
  { value: 'comedies', label: 'Comedies' },
  { value: 'comediesDramasInternationalMovies', label: 'Comedies & Dramas International Movies' },
  { value: 'comediesInternationalMovies', label: 'Comedies International Movies' },
  { value: 'comediesRomanticMovies', label: 'Comedies Romantic Movies' },
  { value: 'crimeTvShowsDocuseries', label: 'Crime TV Shows / Docuseries' },
  { value: 'documentaries', label: 'Documentaries' },
  { value: 'documentariesInternationalMovies', label: 'Documentaries International Movies' },
  { value: 'docuseries', label: 'Docuseries' },
  { value: 'dramas', label: 'Dramas' },
  { value: 'dramasInternationalMovies', label: 'Dramas International Movies' },
  { value: 'dramasRomanticMovies', label: 'Dramas Romantic Movies' },
  { value: 'familyMovies', label: 'Family Movies' },
  { value: 'fantasy', label: 'Fantasy' },
  { value: 'horrorMovies', label: 'Horror Movies' },
  { value: 'internationalMoviesThrillers', label: 'International Movies Thrillers' },
  { value: 'internationalTvShowsRomanticTvShowsTvDramas', label: 'International TV Shows / Romantic TV Shows / TV Dramas' },
  { value: 'kidsTv', label: 'Kids TV' },
  { value: 'languageTvShows', label: 'Language TV Shows' },
  { value: 'musicals', label: 'Musicals' },
  { value: 'natureTv', label: 'Nature TV' },
  { value: 'realityTv', label: 'Reality TV' },
  { value: 'spirituality', label: 'Spirituality' },
  { value: 'tvAction', label: 'TV Action' },
  { value: 'tvComedies', label: 'TV Comedies' },
  { value: 'tvDramas', label: 'TV Dramas' },
  { value: 'talkShowsTvComedies', label: 'Talk Shows / TV Comedies' },
  { value: 'thrillers', label: 'Thrillers' }
];

const AdminMoviesTableRow: React.FC<AdminMoviesTableRowProps> = ({ movie, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(movie.title);
  const [editedDirector, setEditedDirector] = useState<string>(movie.director);
  const [editedReleaseYear, setEditedReleaseYear] = useState<number>(movie.releaseYear);
  const [editedRating, setEditedRating] = useState<string>(movie.rating);
  
  // State for the selected genre.
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  // State for the inline searchable dropdown.
  const [genreSearchTerm, setGenreSearchTerm] = useState<string>("");
  const [genreDropdownOpen, setGenreDropdownOpen] = useState<boolean>(false);

  // When the movie changes, initialize selectedGenre from movie data.
  // For simplicity, we pick the first matching genre from mainGenres.
  useEffect(() => {
    const found = mainGenres.find((group: GenreGroup) =>
      group.keys.some((key) => Number((movie as any)[key]) === 1)
    );
    if (found) {
      setSelectedGenre(found.id);
    } else {
      setSelectedGenre("");
    }
    // Also clear any previous search term.
    setGenreSearchTerm("");
    setGenreDropdownOpen(false);
  }, [movie]);

  const handleSave = () => {
    // Build an updated movie record, first resetting all genre flags.
    const updatedMovie: Movie = {
      ...movie,
      title: editedTitle,
      director: editedDirector,
      releaseYear: editedReleaseYear,
      rating: editedRating,
      action: 0,
      adventure: 0,
      tvAction: 0,
      comedies: 0,
      comediesDramasInternationalMovies: 0,
      comediesInternationalMovies: 0,
      comediesRomanticMovies: 0,
      tvComedies: 0,
      talkShowsTvComedies: 0,
      dramas: 0,
      dramasInternationalMovies: 0,
      dramasRomanticMovies: 0,
      tvDramas: 0,
      internationalTvShowsRomanticTvShowsTvDramas: 0,
      documentaries: 0,
      documentariesInternationalMovies: 0,
      docuseries: 0,
      britishTvShowsDocuseriesInternationalTvShows: 0,
      crimeTvShowsDocuseries: 0,
      horrorMovies: 0,
      thrillers: 0,
      internationalMoviesThrillers: 0,
      children: 0,
      familyMovies: 0,
      kidsTv: 0,
      fantasy: 0,
      musicals: 0,
      animeSeriesInternationalTvShows: 0,
      languageTvShows: 0,
      natureTv: 0,
      realityTv: 0,
      spirituality: 0,
    };

    // Map the selectedGenre to the appropriate flags.
    if (selectedGenre === 'action-adventure') {
      updatedMovie.action = updatedMovie.adventure = updatedMovie.tvAction = 1;
    } else if (selectedGenre === 'comedy') {
      updatedMovie.comedies =
        updatedMovie.comediesDramasInternationalMovies =
        updatedMovie.comediesInternationalMovies =
        updatedMovie.comediesRomanticMovies =
        updatedMovie.tvComedies =
        updatedMovie.talkShowsTvComedies = 1;
    } else if (selectedGenre === 'drama') {
      updatedMovie.dramas =
        updatedMovie.dramasInternationalMovies =
        updatedMovie.dramasRomanticMovies =
        updatedMovie.tvDramas =
        updatedMovie.internationalTvShowsRomanticTvShowsTvDramas = 1;
    } else if (selectedGenre === 'documentary') {
      updatedMovie.documentaries =
        updatedMovie.documentariesInternationalMovies =
        updatedMovie.docuseries =
        updatedMovie.britishTvShowsDocuseriesInternationalTvShows =
        updatedMovie.crimeTvShowsDocuseries = 1;
    } else if (selectedGenre === 'horror-thriller') {
      updatedMovie.horrorMovies =
        updatedMovie.thrillers =
        updatedMovie.internationalMoviesThrillers = 1;
    } else if (selectedGenre === 'family') {
      updatedMovie.children =
        updatedMovie.familyMovies =
        updatedMovie.kidsTv = 1;
    } else if (selectedGenre === 'fantasy-musical') {
      updatedMovie.fantasy =
        updatedMovie.musicals = 1;
    } else if (selectedGenre === 'international') {
      updatedMovie.animeSeriesInternationalTvShows =
        updatedMovie.languageTvShows =
        updatedMovie.natureTv =
        updatedMovie.realityTv =
        updatedMovie.spirituality = 1;
    }
    onUpdate(updatedMovie);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(movie.title);
    setEditedDirector(movie.director);
    setEditedReleaseYear(movie.releaseYear);
    setEditedRating(movie.rating);
    // Reset genre selection based on movie data.
    const found = mainGenres.find((group: GenreGroup) =>
      group.keys.some((key) => Number((movie as any)[key]) === 1)
    );
    setSelectedGenre(found ? found.id : "");
    setGenreSearchTerm("");
    setGenreDropdownOpen(false);
  };

  return (
    <tr>
      <td>{movie.showId}</td>
      {isEditing ? (
        <>
          <td>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="form-control"
            />
          </td>
          <td>
            <input
              type="text"
              value={editedDirector}
              onChange={(e) => setEditedDirector(e.target.value)}
              className="form-control"
            />
          </td>
          <td>
            <input
              type="number"
              value={editedReleaseYear}
              onChange={(e) => setEditedReleaseYear(Number(e.target.value))}
              className="form-control"
            />
          </td>
          {/* Genre searchable dropdown inline */}
          <td>
            <div className="dropdown" style={{ position: 'relative' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search genre..."
                value={
                  genreDropdownOpen
                    ? genreSearchTerm
                    : selectedGenre
                    ? genreOptions.find(o => o.value === selectedGenre)?.label || ''
                    : ''
                }
                onFocus={() => setGenreDropdownOpen(true)}
                onChange={(e) => {
                  setGenreSearchTerm(e.target.value);
                  setGenreDropdownOpen(true);
                }}
              />
              {genreDropdownOpen && (
                <ul
                  className="list-group"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    zIndex: 1000,
                    maxHeight: '200px',
                    overflowY: 'auto'
                  }}
                >
                  {genreOptions
                    .filter(opt =>
                      opt.label.toLowerCase().includes(genreSearchTerm.toLowerCase())
                    )
                    .map(opt => (
                      <li
                        key={opt.value}
                        className="list-group-item list-group-item-action"
                        onClick={() => {
                          setSelectedGenre(opt.value);
                          setGenreDropdownOpen(false);
                          setGenreSearchTerm(opt.label);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        {opt.label}
                      </li>
                    ))}
                  {genreOptions.filter(opt =>
                    opt.label.toLowerCase().includes(genreSearchTerm.toLowerCase())
                  ).length === 0 && (
                    <li className="list-group-item">No options found</li>
                  )}
                </ul>
              )}
            </div>
          </td>
          <td>
            <input
              type="text"
              value={editedRating}
              onChange={(e) => setEditedRating(e.target.value)}
              className="form-control"
            />
          </td>
          <td>
            <button className="btn btn-success btn-sm me-2" onClick={handleSave}>
              Save
            </button>
            <button className="btn btn-secondary btn-sm" onClick={handleCancel}>
              Cancel
            </button>
          </td>
        </>
      ) : (
        <>
          <td>{movie.title}</td>
          <td>{movie.director}</td>
          <td>{movie.releaseYear}</td>
          <td>{getCombinedGenres(movie)}</td>
          <td>{movie.rating}</td>
          <td>
            <button className="btn btn-primary btn-sm me-2" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(movie.showId)}>
              Delete
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default AdminMoviesTableRow;
