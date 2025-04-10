import React from 'react';

export interface GenreGroup {
  id: string;
  label: string;
  keys: string[];
}

interface GenreFilterProps {
  genreGroups: GenreGroup[];
  selectedGenres: string[];
  onGenreChange: (genreId: string, checked: boolean) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({
  genreGroups,
  selectedGenres,
  onGenreChange,
}) => {
  return (
    <div>
      <h5 className="mb-3">Filter by Genre</h5>
      {genreGroups.map((group) => (
        <div key={group.id} className="form-check mb-2">
          <input
            type="checkbox"
            className="form-check-input"
            id={group.id}
            checked={selectedGenres.includes(group.id)}
            onChange={(e) => onGenreChange(group.id, e.target.checked)}
          />
          <label className="form-check-label" htmlFor={group.id}>
            {group.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default GenreFilter;
//test commetn
