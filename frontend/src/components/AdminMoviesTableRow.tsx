// AdminMoviesTableRow.tsx
import React, { useState, useEffect } from 'react';
import { Movie } from '../types/Movie';
import { mainGenres, getCombinedGenres, GenreGroup } from '../types/mainGenres';

interface AdminMoviesTableRowProps {
  movie: Movie;
  onUpdate: (updatedMovie: Movie) => void;
  onDelete: (showId: string) => void;
}

const AdminMoviesTableRow: React.FC<AdminMoviesTableRowProps> = ({ movie, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(movie.title);
  const [editedDirector, setEditedDirector] = useState<string>(movie.director);
  const [editedReleaseYear, setEditedReleaseYear] = useState<number>(movie.releaseYear);
  const [editedRating, setEditedRating] = useState<string>(movie.rating);
  const [editedGenreGroups, setEditedGenreGroups] = useState<string[]>([]);

  // Initialize genre checkboxes based on movie data.
  useEffect(() => {
    const initialGroups = mainGenres
      .filter((group: GenreGroup) =>
        group.keys.some((key) => Number((movie as any)[key]) === 1)
      )
      .map((group: GenreGroup) => group.id);
    setEditedGenreGroups(initialGroups);
  }, [movie]);

  const handleToggleGenre = (groupId: string, checked: boolean) => {
    setEditedGenreGroups((prev) =>
      checked ? [...prev, groupId] : prev.filter((id) => id !== groupId)
    );
  };

  const handleSave = () => {
    // Build an updated movie record.
    const updatedMovie: Movie = {
      ...movie,
      title: editedTitle,
      director: editedDirector,
      releaseYear: editedReleaseYear,
      rating: editedRating,
      // For each main genre group, update each key:
      action: editedGenreGroups.includes('action-adventure') ? 1 : 0,
      adventure: editedGenreGroups.includes('action-adventure') ? 1 : 0,
      tvAction: editedGenreGroups.includes('action-adventure') ? 1 : 0,

      comedies: editedGenreGroups.includes('comedy') ? 1 : 0,
      comediesDramasInternationalMovies: editedGenreGroups.includes('comedy') ? 1 : 0,
      comediesInternationalMovies: editedGenreGroups.includes('comedy') ? 1 : 0,
      comediesRomanticMovies: editedGenreGroups.includes('comedy') ? 1 : 0,
      tvComedies: editedGenreGroups.includes('comedy') ? 1 : 0,
      talkShowsTvComedies: editedGenreGroups.includes('comedy') ? 1 : 0,

      dramas: editedGenreGroups.includes('drama') ? 1 : 0,
      dramasInternationalMovies: editedGenreGroups.includes('drama') ? 1 : 0,
      dramasRomanticMovies: editedGenreGroups.includes('drama') ? 1 : 0,
      tvDramas: editedGenreGroups.includes('drama') ? 1 : 0,
      internationalTvShowsRomanticTvShowsTvDramas: editedGenreGroups.includes('drama') ? 1 : 0,

      documentaries: editedGenreGroups.includes('documentary') ? 1 : 0,
      documentariesInternationalMovies: editedGenreGroups.includes('documentary') ? 1 : 0,
      docuseries: editedGenreGroups.includes('documentary') ? 1 : 0,
      britishTvShowsDocuseriesInternationalTvShows: editedGenreGroups.includes('documentary') ? 1 : 0,
      crimeTvShowsDocuseries: editedGenreGroups.includes('documentary') ? 1 : 0,

      horrorMovies: editedGenreGroups.includes('horror-thriller') ? 1 : 0,
      thrillers: editedGenreGroups.includes('horror-thriller') ? 1 : 0,
      internationalMoviesThrillers: editedGenreGroups.includes('horror-thriller') ? 1 : 0,

      children: editedGenreGroups.includes('family') ? 1 : 0,
      familyMovies: editedGenreGroups.includes('family') ? 1 : 0,
      kidsTv: editedGenreGroups.includes('family') ? 1 : 0,

      fantasy: editedGenreGroups.includes('fantasy-musical') ? 1 : 0,
      musicals: editedGenreGroups.includes('fantasy-musical') ? 1 : 0,

      animeSeriesInternationalTvShows: editedGenreGroups.includes('international') ? 1 : 0,
      languageTvShows: editedGenreGroups.includes('international') ? 1 : 0,
      natureTv: editedGenreGroups.includes('international') ? 1 : 0,
      realityTv: editedGenreGroups.includes('international') ? 1 : 0,
      spirituality: editedGenreGroups.includes('international') ? 1 : 0,
    };
    onUpdate(updatedMovie);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(movie.title);
    setEditedDirector(movie.director);
    setEditedReleaseYear(movie.releaseYear);
    setEditedRating(movie.rating);
    const initialGroups = mainGenres
      .filter((group: GenreGroup) =>
        group.keys.some((key) => Number((movie as any)[key]) === 1)
      )
      .map((group: GenreGroup) => group.id);
    setEditedGenreGroups(initialGroups);
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
          <td>
            {mainGenres.map((group) => (
              <div key={group.id} className="form-check">
                <input
                  type="checkbox"
                  id={`${movie.showId}-${group.id}`}
                  className="form-check-input"
                  checked={editedGenreGroups.includes(group.id)}
                  onChange={(e) => handleToggleGenre(group.id, e.target.checked)}
                />
                <label className="form-check-label" htmlFor={`${movie.showId}-${group.id}`}>
                  {group.label}
                </label>
              </div>
            ))}
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
