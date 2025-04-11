// AddMoviePage.tsx
import React, { useState } from 'react';
import { Movie } from '../types/Movie';
import { useNavigate } from 'react-router-dom';

interface GenreOption {
  value: string;
  label: string;
}

const typeOptions: GenreOption[] = [
  { value: 'Movie', label: 'Movie' },
  { value: 'TV Show', label: 'TV Show' },
  { value: 'Documentary', label: 'Documentary' },
  // Add more type options as needed…
];

const countryOptions: GenreOption[] = [
    { value: 'USA', label: 'USA' },
    { value: 'United Kingdom', label: 'United Kingdom' },
    { value: 'Canada', label: 'Canada' },
    { value: 'France', label: 'France' },
    { value: 'Germany', label: 'Germany' },
    { value: 'China', label: 'China' },
    { value: 'India', label: 'India' },
    { value: 'Japan', label: 'Japan' },
    { value: 'Italy', label: 'Italy' },
    { value: 'Spain', label: 'Spain' },
  // Add additional countries as needed…
];
  
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

/**
 * A simple searchable dropdown component.
 */
const GenreSelect: React.FC<{
    value: string;
    onChange: (value: string) => void;
    options: GenreOption[];
  }> = ({ value, onChange, options }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
  
    const filteredOptions = options.filter(opt =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div className="dropdown" style={{ position: 'relative' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search genre..."
          value={isOpen ? searchTerm : value ? options.find(o => o.value === value)?.label || '' : ''}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
        />
        {isOpen && (
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
            {filteredOptions.map(opt => (
              <li
                key={opt.value}
                className="list-group-item list-group-item-action"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
                style={{ cursor: 'pointer' }}
              >
                {opt.label}
              </li>
            ))}
            {filteredOptions.length === 0 && (
              <li className="list-group-item">No options found</li>
            )}
          </ul>
        )}
      </div>
    );
  };


  const AddMoviePage: React.FC = () => {
    // Form field state.
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [cast, setCast] = useState('');
    const [country, setCountry] = useState('');
    const [releaseYear, setReleaseYear] = useState<number>(new Date().getFullYear());
    const [rating, setRating] = useState('');
    const [duration, setDuration] = useState('');
    const [durationMin, setDurationMin] = useState<number>(0);
    const [description, setDescription] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
  
    const navigate = useNavigate();
  
    // Handle form submission.
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      const newMovie: Movie = {
        showId: '', // Let backend assign an ID.
        type,
        title,
        director,
        cast,
        country,
        releaseYear,
        rating,
        duration,
        description,
        durationNum: durationMin,
        // Default all genre fields to 0.
        action: 0,
        adventure: 0,
        animeSeriesInternationalTvShows: 0,
        britishTvShowsDocuseriesInternationalTvShows: 0,
        children: 0,
        comedies: 0,
        comediesDramasInternationalMovies: 0,
        comediesInternationalMovies: 0,
        comediesRomanticMovies: 0,
        crimeTvShowsDocuseries: 0,
        documentaries: 0,
        documentariesInternationalMovies: 0,
        docuseries: 0,
        dramas: 0,
        dramasInternationalMovies: 0,
        dramasRomanticMovies: 0,
        familyMovies: 0,
        fantasy: 0,
        horrorMovies: 0,
        internationalMoviesThrillers: 0,
        internationalTvShowsRomanticTvShowsTvDramas: 0,
        kidsTv: 0,
        languageTvShows: 0,
        musicals: 0,
        natureTv: 0,
        realityTv: 0,
        spirituality: 0,
        tvAction: 0,
        tvComedies: 0,
        tvDramas: 0,
        talkShowsTvComedies: 0,
        thrillers: 0,
      };
  
      if (selectedGenre) {
        (newMovie as any)[selectedGenre] = 1;
      }
  
      try {
        const response = await fetch('https://intex-winter-backend-2-b0cjguhaejd7hxap.westus2-01.azurewebsites.net/api/Movie/AddMovie', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newMovie)
        });
  
        if (!response.ok) {
          throw new Error('Failed to add movie');
        }

  
        // Navigate to the admin page.
        navigate('/admin');
      } catch (error: any) {
        console.error(error);
        alert("Error adding movie: " + error.message);
      }
    };
  
  
    return (
      <div className="container mt-4">
        <h1>Add Movie</h1>
        <form onSubmit={handleSubmit}>
          {/* Row 1: Type and Country */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Type</label>
              <select
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="">Select Type</option>
                {typeOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Country</label>
              <select
                className="form-select"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                <option value="">Select Country</option>
                {countryOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
  
          {/* Row 2: Title and Director */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Director</label>
              <input
                type="text"
                className="form-control"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                required
              />
            </div>
          </div>
  
          {/* Row 3: Release Year and Rating */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Release Year</label>
              <input
                type="number"
                className="form-control"
                value={releaseYear}
                onChange={(e) => setReleaseYear(Number(e.target.value))}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Rating</label>
              <input
                type="text"
                className="form-control"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              />
            </div>
          </div>
  
          {/* Row 4: Duration and Duration in Minutes */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Duration (e.g., Number of Seasons)</label>
              <input
                type="text"
                className="form-control"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Duration Number</label>
              <input
                type="number"
                className="form-control"
                value={durationMin}
                onChange={(e) => setDurationMin(Number(e.target.value))}
              />
            </div>
          </div>
  
          {/* Row 5: Cast */}
          <div className="row">
            <div className="col-12 mb-3">
              <label className="form-label">Cast</label>
              <input
                type="text"
                className="form-control"
                value={cast}
                onChange={(e) => setCast(e.target.value)}
              />
            </div>
          </div>
  
          {/* Row 6: Description */}
          <div className="row">
            <div className="col-12 mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
  
          {/* Row 7: Genre Select */}
          <div className="row">
            <div className="col-12 mb-3">
              <label className="form-label">Genre</label>
              <GenreSelect
                value={selectedGenre}
                onChange={setSelectedGenre}
                options={genreOptions}
              />
            </div>
          </div>
  
          {/* Submit Button */}
          <div className="row">
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Add Movie
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };
  
  export default AddMoviePage;