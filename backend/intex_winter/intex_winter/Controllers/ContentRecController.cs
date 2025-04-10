using intex_winter.Data;
using Microsoft.AspNetCore.Mvc;

namespace intex_winter.Controllers;


[ApiController]
[Route("api/[controller]")]
public class ContentRecController : ControllerBase
{
    private readonly ContentDbContext _context;
    public ContentRecController(ContentDbContext temp)
    { 
        _context = temp;
    }

    [HttpGet("{showId}")]
    public async Task<IActionResult> Get(string showId)
    {
        var recs = await _context.ContentRecs.FindAsync(showId);
        if (recs == null) return NotFound();
        return Ok(recs);
    }
    
}