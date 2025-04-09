// mainGenres.ts
export interface GenreGroup {
    id: string;
    label: string;
    keys: string[];
  }
  
  export const mainGenres: GenreGroup[] = [
    {
      id: 'action-adventure',
      label: 'Action & Adventure',
      keys: ['action', 'adventure', 'tvAction']
    },
    {
      id: 'comedy',
      label: 'Comedy',
      keys: ['comedies', 'comediesDramasInternationalMovies', 'comediesInternationalMovies', 'comediesRomanticMovies', 'tvComedies', 'talkShowsTvComedies']
    },
    {
      id: 'drama',
      label: 'Drama',
      keys: ['dramas', 'dramasInternationalMovies', 'dramasRomanticMovies', 'tvDramas', 'internationalTvShowsRomanticTvShowsTvDramas']
    },
    {
      id: 'documentary',
      label: 'Documentary',
      keys: ['documentaries', 'documentariesInternationalMovies', 'docuseries', 'britishTvShowsDocuseriesInternationalTvShows', 'crimeTvShowsDocuseries']
    },
    {
      id: 'horror-thriller',
      label: 'Horror & Thriller',
      keys: ['horrorMovies', 'thrillers', 'internationalMoviesThrillers']
    },
    {
      id: 'family',
      label: 'Family',
      keys: ['children', 'familyMovies', 'kidsTv']
    },
    {
      id: 'fantasy-musical',
      label: 'Fantasy & Musical',
      keys: ['fantasy', 'musicals']
    },
    {
      id: 'international',
      label: 'International',
      keys: ['animeSeriesInternationalTvShows', 'languageTvShows', 'natureTv', 'realityTv', 'spirituality']
    }
  ];
  
  // Helper: for display mode, determine which genre groups are active based on a movie’s fields.
  export const getCombinedGenres = (movie: any): string => {
    const groups = mainGenres.filter((group) =>
      group.keys.some((key) => Number(movie[key]) === 1)
    );
    return groups.map((g) => g.label).join(', ');
  };
  