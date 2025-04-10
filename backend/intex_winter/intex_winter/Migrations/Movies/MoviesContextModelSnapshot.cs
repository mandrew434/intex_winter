﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using intex_winter.Data;

#nullable disable

namespace intex_winter.Migrations.Movies
{
    [DbContext(typeof(MoviesContext))]
    partial class MoviesContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.14");

            modelBuilder.Entity("intex_winter.Data.MoviesRating", b =>
                {
                    b.Property<int?>("Rating")
                        .HasColumnType("INTEGER")
                        .HasColumnName("rating");

                    b.Property<string>("ShowId")
                        .HasColumnType("TEXT")
                        .HasColumnName("show_id");

                    b.Property<int?>("UserId")
                        .HasColumnType("INTEGER")
                        .HasColumnName("user_id");

                    b.ToTable("movies_ratings", (string)null);
                });

            modelBuilder.Entity("intex_winter.Data.MoviesTitle", b =>
                {
                    b.Property<int?>("Action")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Adventure")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("AnimeSeriesInternationalTvShows")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Anime Series International TV Shows");

                    b.Property<int?>("BritishTvShowsDocuseriesInternationalTvShows")
                        .HasColumnType("INTEGER")
                        .HasColumnName("British TV Shows Docuseries International TV Shows");

                    b.Property<string>("Cast")
                        .HasColumnType("TEXT")
                        .HasColumnName("cast");

                    b.Property<int?>("Children")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Comedies")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("ComediesDramasInternationalMovies")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Comedies Dramas International Movies");

                    b.Property<int?>("ComediesInternationalMovies")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Comedies International Movies");

                    b.Property<int?>("ComediesRomanticMovies")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Comedies Romantic Movies");

                    b.Property<string>("Country")
                        .HasColumnType("TEXT")
                        .HasColumnName("country");

                    b.Property<int?>("CrimeTvShowsDocuseries")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Crime TV Shows Docuseries");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT")
                        .HasColumnName("description");

                    b.Property<string>("Director")
                        .HasColumnType("TEXT")
                        .HasColumnName("director");

                    b.Property<int?>("Documentaries")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("DocumentariesInternationalMovies")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Documentaries International Movies");

                    b.Property<int?>("Docuseries")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Dramas")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("DramasInternationalMovies")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Dramas International Movies");

                    b.Property<int?>("DramasRomanticMovies")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Dramas Romantic Movies");

                    b.Property<string>("Duration")
                        .HasColumnType("TEXT")
                        .HasColumnName("duration");

                    b.Property<int?>("DurationNum")
                        .HasColumnType("INTEGER")
                        .HasColumnName("duration_num");

                    b.Property<int?>("FamilyMovies")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Family Movies");

                    b.Property<int?>("Fantasy")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("HorrorMovies")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Horror Movies");

                    b.Property<int?>("InternationalMoviesThrillers")
                        .HasColumnType("INTEGER")
                        .HasColumnName("International Movies Thrillers");

                    b.Property<int?>("InternationalTvShowsRomanticTvShowsTvDramas")
                        .HasColumnType("INTEGER")
                        .HasColumnName("International TV Shows Romantic TV Shows TV Dramas");

                    b.Property<int?>("KidsTv")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Kids' TV");

                    b.Property<int?>("LanguageTvShows")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Language TV Shows");

                    b.Property<int?>("Musicals")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("NatureTv")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Nature TV");

                    b.Property<string>("Rating")
                        .HasColumnType("TEXT")
                        .HasColumnName("rating");

                    b.Property<int?>("RealityTv")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Reality TV");

                    b.Property<int?>("ReleaseYear")
                        .HasColumnType("INTEGER")
                        .HasColumnName("release_year");

                    b.Property<string>("ShowId")
                        .HasColumnType("TEXT")
                        .HasColumnName("show_id");

                    b.Property<int?>("Spirituality")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("TalkShowsTvComedies")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Talk Shows TV Comedies");

                    b.Property<int?>("Thrillers")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT")
                        .HasColumnName("title");

                    b.Property<int?>("TvAction")
                        .HasColumnType("INTEGER")
                        .HasColumnName("TV Action");

                    b.Property<int?>("TvComedies")
                        .HasColumnType("INTEGER")
                        .HasColumnName("TV Comedies");

                    b.Property<int?>("TvDramas")
                        .HasColumnType("INTEGER")
                        .HasColumnName("TV Dramas");

                    b.Property<string>("Type")
                        .HasColumnType("TEXT")
                        .HasColumnName("type");

                    b.ToTable("movies_titles", (string)null);
                });

            modelBuilder.Entity("intex_winter.Data.MoviesUser", b =>
                {
                    b.Property<int?>("Age")
                        .HasColumnType("INTEGER")
                        .HasColumnName("age");

                    b.Property<int?>("AmazonPrime")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Amazon Prime");

                    b.Property<int?>("AppleTv")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Apple TV+");

                    b.Property<string>("City")
                        .HasColumnType("TEXT")
                        .HasColumnName("city");

                    b.Property<int?>("Disney")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Disney+");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT")
                        .HasColumnName("email");

                    b.Property<int?>("Hulu")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("IsMale")
                        .HasColumnType("INTEGER")
                        .HasColumnName("is_male");

                    b.Property<int?>("Max")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT")
                        .HasColumnName("name");

                    b.Property<int?>("Netflix")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Paramount")
                        .HasColumnType("INTEGER")
                        .HasColumnName("Paramount+");

                    b.Property<int?>("Peacock")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Phone")
                        .HasColumnType("TEXT")
                        .HasColumnName("phone");

                    b.Property<string>("State")
                        .HasColumnType("TEXT")
                        .HasColumnName("state");

                    b.Property<int?>("UserId")
                        .HasColumnType("INTEGER")
                        .HasColumnName("user_id");

                    b.Property<int?>("Zip")
                        .HasColumnType("INTEGER")
                        .HasColumnName("zip");

                    b.ToTable("movies_users", (string)null);
                });
#pragma warning restore 612, 618
        }
    }
}
