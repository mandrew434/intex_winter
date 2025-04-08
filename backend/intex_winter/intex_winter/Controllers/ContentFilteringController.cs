using intex_winter.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class ContentFilteringController : ControllerBase
{
    // These values could come from configuration instead of hard-coding.
    private const string ConnectionString = "DefaultEndpointsProtocol=https;AccountName=intexstorage2025;AccountKey=aVD8GUL59WjkUBm9FCb/VZI2gQyeB9pl5yiNnsewzHpwEtF7W3tcY5O66YZ+6sh0r6tcprQYXc6i+AStQXiFPQ==;EndpointSuffix=core.windows.net";
    private const string ContainerName = "intexcontainer";
    private const string BlobName = "ContentFilter.csv";

    // GET: api/Recommendations/{showId}?topN=5
    [HttpGet("{showId}")]
    public async Task<IActionResult> GetRecommendations(string showId, [FromQuery] int topN = 5)
    {
        // Create an instance of the blob helper (using connection string, container, and blob name).
        var blobHelper = new AzureBlobHelper(ConnectionString, ContainerName, BlobName);
        
        // Use the helper's method to get the top similar ShowIds for the provided showId.
        var recommendations = await blobHelper.GetTopSimilarAsync(showId, topN);
        foreach (var rec in recommendations)
        {
            Console.WriteLine($"ShowId: {rec.ShowId}, Score: {rec.Score}");
        }
        
        // Return the recommendations as JSON.
        return Ok(recommendations);
    }
}
