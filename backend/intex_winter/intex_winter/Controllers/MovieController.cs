using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using intex_winter.Data;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api/[controller]")]
//[Authorize]
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
        var movies = await _context.MoviesTitles.ToListAsync();
        return Ok(movies);
    }

    // GET: api/Movie/details/{showId}
    [HttpGet("moviedetails/{showId}")]
    public async Task<IActionResult> GetMovieDetails(string showId)
    {
        // Validate the provided showId if necessary.
        if (string.IsNullOrEmpty(showId))
        {
            return BadRequest("Invalid movie id");
        }

        // Query the MoviesTitles table using the provided showId.
        // Assumes your Movie model contains properties: type, title, director, cast,
        // country, releaseYear, rating, duration, and description.
        var movie = await _context.MoviesTitles.FirstOrDefaultAsync(m => m.ShowId == showId);

        if (movie == null)
        {
            // Return a 404 status code with an explanation if the movie is not found.
            return NotFound($"Movie with id {showId} was not found.");
        }

        // Return the movie details as a JSON response.
        return Ok(movie);
    }


    [HttpPost("AddMovie")]
    [Authorize(Roles = "Admin")]
    public IActionResult AddMovie([FromBody] MoviesTitle newMovie)
    {
        
            // Retrieve only the ShowId values and then evaluate in memory.
            var showIds = _context.MoviesTitles
                .Select(m => m.ShowId)
                .AsEnumerable(); // Now processing happens on the client.

            // Find the maximum numeric value in the ShowIds.
            int maxNumericId = showIds
                .Select(id => int.Parse(id.Substring(1)))
                .DefaultIfEmpty(8807)  // If no movies exist, the max will be 8807.
                .Max();

            int newNumericId = maxNumericId + 1;

            // Assign the new ShowId using the pattern, for instance "s8808" if max was "s8807".
            newMovie.ShowId = "s" + newNumericId;
            Console.WriteLine(newMovie);
        try
        {

            _context.MoviesTitles.Add(newMovie);
            _context.SaveChanges();

            return Ok(newMovie);
        }
        catch (Exception ex)
        {
            Console.WriteLine(newMovie);
            // Handle any exceptions that occur during the process.
            return BadRequest(new { message = "An error occurred while adding the movie.", error = ex.Message });
        }

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