using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace intex_winter.Data;

public partial class RecommendersDbContext : DbContext
{
    public RecommendersDbContext()
    {
    }

    public RecommendersDbContext(DbContextOptions<RecommendersDbContext> options)
        : base(options)
    {
    }

    public DbSet<CollaborativeFilter> CollaborativeFilter { get; set; }


}
