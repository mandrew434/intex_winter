using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using intex_winter.Data;

[ApiController]
[Route("api/[controller]")]
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
        var movies = await _context.MoviesTitles.Take(50).ToListAsync();
        return Ok(movies);
    }
}