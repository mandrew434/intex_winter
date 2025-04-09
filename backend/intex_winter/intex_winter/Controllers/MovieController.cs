using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using intex_winter.Data;

[ApiController]
[Route("api/[controller]")]
// [Authorize]
public class MovieController : ControllerBase
{
    private readonly MoviesContext _context;

    public MovieController(MoviesContext context)
    {
        _context = context;
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAllMovies()
    {
        // right now it is just returning 50 to not plug up the server
        var movies = await _context.MoviesTitles.Take(100).ToListAsync();
        return Ok(movies);
    }

    [HttpPost("AddMovie")]
    public IActionResult AddMovie([FromBody] MoviesTitle newMovie)
    {
        _context.MoviesTitles.Add(newMovie);
        _context.SaveChanges();
        return Ok(newMovie);
    }

    [HttpPut("UpdateMovie/{showId}")]
    public IActionResult UpdateMovie(string showId, [FromBody] MoviesTitle updatedMovie)
    {
        var existingMovie = _context.MoviesTitles.Find(showId);

        existingMovie.Type = updatedMovie.Type;
        existingMovie.Title = updatedMovie.Title;
        existingMovie.Director = updatedMovie.Director;
        existingMovie.Cast = updatedMovie.Cast;
        existingMovie.Country = updatedMovie.Country;
        existingMovie.ReleaseYear = updatedMovie.ReleaseYear;
        existingMovie.Rating = updatedMovie.Rating;
        existingMovie.Duration = updatedMovie.Duration;
        existingMovie.Description = updatedMovie.Description;
        existingMovie.Action = updatedMovie.Action;
        existingMovie.Adventure = updatedMovie.Adventure;
        existingMovie.AnimeSeriesInternationalTvShows = updatedMovie.AnimeSeriesInternationalTvShows;
        existingMovie.BritishTvShowsDocuseriesInternationalTvShows = updatedMovie.BritishTvShowsDocuseriesInternationalTvShows;
        existingMovie.Children = updatedMovie.Children;
        existingMovie.Comedies = updatedMovie.Comedies;
        existingMovie.ComediesDramasInternationalMovies = updatedMovie.ComediesDramasInternationalMovies;
        existingMovie.ComediesInternationalMovies = updatedMovie.ComediesInternationalMovies;
        existingMovie.ComediesRomanticMovies = updatedMovie.ComediesRomanticMovies;
        existingMovie.CrimeTvShowsDocuseries = updatedMovie.CrimeTvShowsDocuseries;
        existingMovie.Documentaries = updatedMovie.Documentaries;
        existingMovie.DocumentariesInternationalMovies = updatedMovie.DocumentariesInternationalMovies;
        existingMovie.Docuseries = updatedMovie.Docuseries;
        existingMovie.Dramas = updatedMovie.Dramas;
        existingMovie.DramasInternationalMovies = updatedMovie.DramasInternationalMovies;
        existingMovie.DramasRomanticMovies = updatedMovie.DramasRomanticMovies;
        existingMovie.FamilyMovies = updatedMovie.FamilyMovies;
        existingMovie.Fantasy = updatedMovie.Fantasy;
        existingMovie.HorrorMovies = updatedMovie.HorrorMovies;
        existingMovie.InternationalMoviesThrillers = updatedMovie.InternationalMoviesThrillers;
        existingMovie.InternationalTvShowsRomanticTvShowsTvDramas = updatedMovie.InternationalTvShowsRomanticTvShowsTvDramas;
        existingMovie.KidsTv = updatedMovie.KidsTv;
        existingMovie.LanguageTvShows = updatedMovie.LanguageTvShows;
        existingMovie.Musicals = updatedMovie.Musicals;
        existingMovie.NatureTv = updatedMovie.NatureTv;
        existingMovie.RealityTv = updatedMovie.RealityTv;
        existingMovie.Spirituality = updatedMovie.Spirituality;
        existingMovie.TvAction = updatedMovie.TvAction;
        existingMovie.TvComedies = updatedMovie.TvComedies;
        existingMovie.TvDramas = updatedMovie.TvDramas;
        existingMovie.TalkShowsTvComedies = updatedMovie.TalkShowsTvComedies;
        existingMovie.Thrillers = updatedMovie.Thrillers;
        existingMovie.DurationNum = updatedMovie.DurationNum;


        _context.MoviesTitles.Update(existingMovie);
        _context.SaveChanges();

        return Ok(existingMovie);
    }

    [HttpDelete("DeleteMovie/{showId}")]
    public IActionResult DeleteMovie(string showId)
    {
        var movieToDelete = _context.MoviesTitles.Find(showId);
        if (movieToDelete == null)
        {
            return NotFound(new { message = "Movie not found" });
        }

        _context.MoviesTitles.Remove(movieToDelete);
        _context.SaveChanges();

        return NoContent();
    }
}