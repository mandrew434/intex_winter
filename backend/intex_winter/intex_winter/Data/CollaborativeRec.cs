using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace intex_winter.Data
{
    public class CollaborativeRec
    {
        [Key]
        public int UserId { get; set; }

        public List<string> Action { get; set; } = new();
        public List<string> Adventure { get; set; } = new();

        [Column("Anime Series International TV Shows")]
        public List<string> AnimeSeriesInternationalTVShows { get; set; } = new();

        [Column("British TV Shows Docuseries International TV Shows")]
        public List<string> BritishTVShowsDocuseriesInternationalTVShows { get; set; } = new();

        public List<string> Children { get; set; } = new();
        public List<string> Comedies { get; set; } = new();

        [Column("Comedies Dramas International Movies")]
        public List<string> ComediesDramasInternationalMovies { get; set; } = new();

        [Column("Comedies International Movies")]
        public List<string> ComediesInternationalMovies { get; set; } = new();

        [Column("Comedies Romantic Movies")]
        public List<string> ComediesRomanticMovies { get; set; } = new();

        [Column("Crime TV Shows Docuseries")]
        public List<string> CrimeTVShowsDocuseries { get; set; } = new();

        public List<string> Documentaries { get; set; } = new();

        [Column("Documentaries International Movies")]
        public List<string> DocumentariesInternationalMovies { get; set; } = new();

        public List<string> Docuseries { get; set; } = new();
        public List<string> Dramas { get; set; } = new();

        [Column("Dramas International Movies")]
        public List<string> DramasInternationalMovies { get; set; } = new();

        [Column("Dramas Romantic Movies")]
        public List<string> DramasRomanticMovies { get; set; } = new();

        [Column("Family Movies")]
        public List<string> FamilyMovies { get; set; } = new();

        public List<string> Fantasy { get; set; } = new();

        [Column("Horror Movies")]
        public List<string> HorrorMovies { get; set; } = new();

        [Column("International Movies Thrillers")]
        public List<string> InternationalMoviesThrillers { get; set; } = new();

        [Column("International TV Shows Romantic TV Shows TV Dramas")]
        public List<string> InternationalTVShowsRomanticTVShowsTVDramas { get; set; } = new();

        [Column("Kids' TV")]
        public List<string> KidsTV { get; set; } = new();

        [Column("Language TV Shows")]
        public List<string> LanguageTVShows { get; set; } = new();

        public List<string> Musicals { get; set; } = new();

        [Column("Nature TV")]
        public List<string> NatureTV { get; set; } = new();

        [Column("Reality TV")]
        public List<string> RealityTV { get; set; } = new();

        public List<string> Spirituality { get; set; } = new();

        [Column("TV Action")]
        public List<string> TVAction { get; set; } = new();

        [Column("TV Comedies")]
        public List<string> TVComedies { get; set; } = new();

        [Column("TV Dramas")]
        public List<string> TVDramas { get; set; } = new();

        [Column("Talk Shows TV Comedies")]
        public List<string> TalkShowsTVComedies { get; set; } = new();

        public List<string> Thrillers { get; set; } = new();
    }
}
