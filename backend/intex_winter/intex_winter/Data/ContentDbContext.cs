using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace intex_winter.Data;

public partial class ContentDbContext : DbContext
{
    public ContentDbContext()
    {
    }

    public ContentDbContext(DbContextOptions<ContentDbContext> options)
        : base(options)
    {
    }

    public DbSet<ContentRec> ContentRecs { get; set; }


}
