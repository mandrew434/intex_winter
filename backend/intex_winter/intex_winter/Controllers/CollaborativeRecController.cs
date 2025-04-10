using intex_winter.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace intex_winter.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CollaborativeRecsController : ControllerBase
{
    private readonly CollaborativeDbContext _db;
    public CollaborativeRecsController(CollaborativeDbContext db) => _db = db;

    [HttpGet("{userId}")]
    public async Task<IActionResult> Get(int userId)
    {
        var recs = await _db.CollaborativeRecs.FindAsync(userId);
        if (recs == null) return NotFound();
        return Ok(recs);
    }
}
