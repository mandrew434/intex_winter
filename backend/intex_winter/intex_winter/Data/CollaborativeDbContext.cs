using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace intex_winter.Data;

public class CollaborativeDbContext : DbContext
{
    // constructor
    public CollaborativeDbContext()
    {}
    
    public CollaborativeDbContext(DbContextOptions<CollaborativeDbContext> options) : base(options)
    {}
    
    
    public DbSet<CollaborativeRec> CollaborativeRecs { get; set; }
    
    
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var jsonConverter = new ValueConverter<List<string>, string>(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions?)null)!);

            modelBuilder.Entity<CollaborativeRec>(b =>
            {
                b.HasKey(e => e.UserId);

                b.Property(e => e.Action)
                 .HasConversion(jsonConverter)
                 .HasColumnName("Action")
                 .HasColumnType("TEXT");

                b.Property(e => e.Adventure)
                 .HasConversion(jsonConverter)
                 .HasColumnName("Adventure")
                 .HasColumnType("TEXT");

                b.Property(e => e.AnimeSeriesInternationalTVShows)
                 .HasConversion(jsonConverter)
                 .HasColumnName("Anime Series International TV Shows")
                 .HasColumnType("TEXT");

                b.Property(e => e.BritishTVShowsDocuseriesInternationalTVShows)
                 .HasConversion(jsonConverter)
                 .HasColumnName("British TV Shows Docuseries International TV Shows")
                 .HasColumnType("TEXT");

                b.Property(e => e.Children)
                 .HasConversion(jsonConverter)
                 .HasColumnName("Children")
                 .HasColumnType("TEXT");

                b.Property(e => e.Comedies)
                 .HasConversion(jsonConverter)
                 .HasColumnName("Comedies")
                 .HasColumnType("TEXT");

                b.Property(e => e.ComediesDramasInternationalMovies)
                 .HasConversion(jsonConverter)
                 .HasColumnName("Comedies Dramas International Movies")
                 .HasColumnType("TEXT");

                b.Property(e => e.ComediesInternationalMovies)
                 .HasConversion(jsonConverter)
                 .HasColumnName("Comedies International Movies")
                 .HasColumnType("TEXT");

                b.Property(e => e.ComediesRomanticMovies)
                 .HasConversion(jsonConverter)
                 .HasColumnName("Comedies Romantic Movies")
                 .HasColumnType("TEXT");

                b.Property(e => e.CrimeTVShowsDocuseries)
                 .HasConversion(jsonConverter)
                 .HasColumnName("Crime TV Shows Docuseries")
                 .HasColumnType("TEXT");

                b.Property(e => e.Documentaries)
                 .HasConversion(jsonConverter)
                 .HasColumnName("Documentaries")
                 .HasColumnType("TEXT");

                b.Property(e => e.DocumentariesInternationalMovies)
                 .HasConversion(jsonConverter)
                 .HasColumnName("Documentaries International Movies")
                 .HasColumnType("TEXT");

                b.Property(e => e.Docuseries)
                 .HasConversion(jsonConverter)
                 .HasColumnName("Docuseries")
                 .HasColumnType("TEXT");

                b.Property(e => e.Dramas)
                 .HasConversion(jsonConverter)
                 .HasColumnName("Dramas")
                 .HasColumnType("TEXT");

                b.Property(e => e.DramasInternationalMovies)
                 .HasConversion(jsonConverter)
                 .HasColumnName("Dramas International Movies")
                 .HasColumnType("TEXT");

                b.Property(e => e.DramasRomanticMovies)
                 .HasConversion(jsonConverter)
                 .HasColumnName("Dramas Romantic Movies")
                 .HasColumnType("TEXT");

                b.Property(e => e.FamilyMovies)
                 .HasConversion(jsonConverter)
                 .HasColumnName("Family Movies")
                 .HasColumnType("TEXT");

                b.Property(e => e.Fantasy)
                 .HasConversion(jsonConverter)
                 .HasColumnName("Fantasy")
                 .HasColumnType("TEXT");

                b.Property(e => e.HorrorMovies)
                 .HasConversion(jsonConverter)
                 .HasColumnName("Horror Movies")
                 .HasColumnType("TEXT");

                b.Property(e => e.InternationalMoviesThrillers)
                 .HasConversion(jsonConverter)
                 .HasColumnName("International Movies Thrillers")
                 .HasColumnType("TEXT");

                b.Property(e => e.InternationalTVShowsRomanticTVShowsTVDramas)
                 .HasConversion(jsonConverter)
                 .HasColumnName("International TV Shows Romantic TV Shows TV Dramas")
                 .HasColumnType("TEXT");

                b.Property(e => e.KidsTV)
                 .HasConversion(jsonConverter)
                 .HasColumnName("Kids' TV")
                 .HasColumnType("TEXT");

                b.Property(e => e.LanguageTVShows)
                 .HasConversion(jsonConverter)
                 .HasColumnName("Language TV Shows")
                 .HasColumnType("TEXT");

                b.Property(e => e.Musicals)
                 .HasConversion(jsonConverter)
                 .HasColumnName("Musicals")
                 .HasColumnType("TEXT");

                b.Property(e => e.NatureTV)
                 .HasConversion(jsonConverter)
                 .HasColumnName("Nature TV")
                 .HasColumnType("TEXT");

                b.Property(e => e.RealityTV)
                 .HasConversion(jsonConverter)
                 .HasColumnName("Reality TV")
                 .HasColumnType("TEXT");

                b.Property(e => e.Spirituality)
                 .HasConversion(jsonConverter)
                 .HasColumnName("Spirituality")
                 .HasColumnType("TEXT");

                b.Property(e => e.TVAction)
                 .HasConversion(jsonConverter)
                 .HasColumnName("TV Action")
                 .HasColumnType("TEXT");

                b.Property(e => e.TVComedies)
                 .HasConversion(jsonConverter)
                 .HasColumnName("TV Comedies")
                 .HasColumnType("TEXT");

                b.Property(e => e.TVDramas)
                 .HasConversion(jsonConverter)
                 .HasColumnName("TV Dramas")
                 .HasColumnType("TEXT");

                b.Property(e => e.TalkShowsTVComedies)
                 .HasConversion(jsonConverter)
                 .HasColumnName("Talk Shows TV Comedies")
                 .HasColumnType("TEXT");

                b.Property(e => e.Thrillers)
                 .HasConversion(jsonConverter)
                 .HasColumnName("Thrillers")
                 .HasColumnType("TEXT");
            });
        }
    }

    
    
    
