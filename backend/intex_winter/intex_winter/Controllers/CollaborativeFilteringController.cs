using intex_winter.Data;
using Microsoft.AspNetCore.Mvc;

namespace intex_winter.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CollaborativeFilteringController : ControllerBase
{
    private RecommendersDbContext _context;
    
    public CollaborativeFilteringController(RecommendersDbContext temp)
    {
        _context = temp;
    }

    [HttpGet]
    public IActionResult GetAllMovies(string selectedShow)
    {
        var recommendations = _context.CollaborativeFilter
            .Where(m => m.ShowId == selectedShow)
            .ToList();

        return Ok(recommendations);
    }
}