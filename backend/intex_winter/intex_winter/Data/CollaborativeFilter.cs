using System.ComponentModel.DataAnnotations;

namespace intex_winter.Data;

public class CollaborativeFilter
{
    [Key]
    public string ShowId { get; set; }
    public string? Recommendation1 { get; set; }
    public string? Recommendation2 { get; set; }
    public string? Recommendation3 { get; set; }
    public string? Recommendation4 { get; set; }
    public string? Recommendation5 { get; set; }
}