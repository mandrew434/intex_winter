import { useState } from 'react';
import { Movie } from '../types/Movie';
import { addMovie } from '../api/MoviesAPI';

interface NewMovieFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}
const NewMovieForm = ({ onSuccess, onCancel }: NewMovieFormProps) => {
  const [formData, setFormData] = useState<Movie>({
    showId: '',
    type: '',
    title: '',
    director: '',
    cast: '',
    country: '',
    releaseYear: 0,
    rating: '',
    duration: '',
    description: '',
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
    durationNum: 0,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addMovie(formData);
    onSuccess();
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Movie</h2>
      <div className="form-grid">
      <label>
          Type:
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
        </label>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <label>
          Director:
          <input
            type="text"
            name="director"
            value={formData.director}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <label>
          Cast:
          <input
            type="text"
            name="cast"
            value={formData.cast}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <label>
          Release Year:
          <input
            type="number"
            name="releaseYear"
            value={formData.releaseYear}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <label>
          Rating:
          <input
            type="text"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <label>
          Movie/Show Length:
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Action:
          <input
            type="number"
            name="action"
            value={formData.action}
            onChange={handleChange}
          />
        </label>        
        <label>
          Adventure:
          <input
            type="number"
            name="adventure"
            value={formData.adventure}
            onChange={handleChange}
          />
        </label>        
        <label>
          Anime Series International TV Shows:
          <input
            type="number"
            name="animeSeriesInternationalTvShows"
            value={formData.animeSeriesInternationalTvShows}
            onChange={handleChange}
          />
        </label>        
        <label>
          British TV Shows Docuseries International TV Shows:
          <input
            type="number"
            name="britishTvShowsDocuseriesInternationalTvShows"
            value={formData.britishTvShowsDocuseriesInternationalTvShows}
            onChange={handleChange}
          />
        </label>        
        <label>
          Children:
          <input
            type="number"
            name="children"
            value={formData.children}
            onChange={handleChange}
          />
        </label>        
        <label>
          Comedies:
          <input
            type="number"
            name="comedies"
            value={formData.comedies}
            onChange={handleChange}
          />
        </label>        
        <label>
          Comedies Dramas International Movies:
          <input
            type="number"
            name="comediesDramasInternationalMovies"
            value={formData.comediesDramasInternationalMovies}
            onChange={handleChange}
          />
        </label>        
        <label>
          Comedies International Movies:
          <input
            type="number"
            name="comediesInternationalMovies"
            value={formData.comediesInternationalMovies}
            onChange={handleChange}
          />
        </label>        
        <label>
          Comedies Romantic Movies:
          <input
            type="number"
            name="comediesRomanticMovies"
            value={formData.comediesRomanticMovies}
            onChange={handleChange}
          />
        </label>        
        <label>
          Crime TV Shows Docuseries:
          <input
            type="number"
            name="crimeTvShowsDocuseries"
            value={formData.crimeTvShowsDocuseries}
            onChange={handleChange}
          />
        </label>        
        <label>
          Documentaries:
          <input
            type="number"
            name="documentaries"
            value={formData.documentaries}
            onChange={handleChange}
          />
        </label>        
        <label>
          Documentaries International Movies:
          <input
            type="number"
            name="documentariesInternationalMovies"
            value={formData.documentariesInternationalMovies}
            onChange={handleChange}
          />
        </label>        
        <label>
          Docuseries:
          <input
            type="number"
            name="docuseries"
            value={formData.docuseries}
            onChange={handleChange}
          />
        </label>        
        <label>
          Dramas:
          <input
            type="number"
            name="dramas"
            value={formData.dramas}
            onChange={handleChange}
          />
        </label>        
        <label>
          Dramas International Movies:
          <input
            type="number"
            name="dramasInternationalMovies"
            value={formData.dramasInternationalMovies}
            onChange={handleChange}
          />
        </label>        
        <label>
          Dramas Romantic Movies:
          <input
            type="number"
            name="dramasRomanticMovies"
            value={formData.dramasRomanticMovies}
            onChange={handleChange}
          />
        </label>        
        <label>
          Family Movies:
          <input
            type="number"
            name="familyMovies"
            value={formData.familyMovies}
            onChange={handleChange}
          />
        </label>        
        <label>
          Fantasy:
          <input
            type="number"
            name="fantasy"
            value={formData.fantasy}
            onChange={handleChange}
          />
        </label>        
        <label>
          Horror Movies:
          <input
            type="number"
            name="horrorMovies"
            value={formData.horrorMovies}
            onChange={handleChange}
          />
        </label>        
        <label>
          International Movies Thrillers:
          <input
            type="number"
            name="internationalMoviesThrillers"
            value={formData.internationalMoviesThrillers}
            onChange={handleChange}
          />
        </label>
        <label>
          International TV Shows Romantic TV Shows TV Dramas:
          <input
            type="number"
            name="internationalTvShowsRomanticTvShowsTvDramas"
            value={formData.internationalTvShowsRomanticTvShowsTvDramas}
            onChange={handleChange}
          />
        </label>        
        <label>
          Kids TV:
          <input
            type="number"
            name="kidsTv"
            value={formData.kidsTv}
            onChange={handleChange}
          />
        </label>        
        <label>
          Language TV Shows:
          <input
            type="number"
            name="languageTvShows"
            value={formData.languageTvShows}
            onChange={handleChange}
          />
        </label>        
        <label>
          Musicals:
          <input
            type="number"
            name="musicals"
            value={formData.musicals}
            onChange={handleChange}
          />
        </label>        
        <label>
          Nature TV:
          <input
            type="number"
            name="natureTv"
            value={formData.natureTv}
            onChange={handleChange}
          />
        </label>        
        <label>
          Reality TV:
          <input
            type="number"
            name="realityTv"
            value={formData.realityTv}
            onChange={handleChange}
          />
        </label>        
        <label>
          Spirituality:
          <input
            type="number"
            name="spirituality"
            value={formData.spirituality}
            onChange={handleChange}
          />
        </label>        
        <label>
          TV Action:
          <input
            type="number"
            name="tvAction"
            value={formData.tvAction}
            onChange={handleChange}
          />
        </label>        
        <label>
          TV Comedies:
          <input
            type="number"
            name="tvComedies"
            value={formData.tvComedies}
            onChange={handleChange}
          />
        </label>        
        <label>
          TV Dramas:
          <input
            type="number"
            name="tvDramas"
            value={formData.tvDramas}
            onChange={handleChange}
          />
        </label>        
        <label>
          Talk Shows TV Comedies:
          <input
            type="number"
            name="talkShowsTvComedies"
            value={formData.talkShowsTvComedies}
            onChange={handleChange}
          />
        </label>        
        <label>
          Thrillers:
          <input
            type="number"
            name="thrillers"
            value={formData.thrillers}
            onChange={handleChange}
          />
        </label>        
        <label>
          Duration (in minutes):
          <input
            type="number"
            name="durationNum"
            value={formData.durationNum}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Movie</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};
export default NewMovieForm;