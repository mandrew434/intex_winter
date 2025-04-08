// types.ts
export interface Movie {
    id: number;
    title: string;
    bannerImage?: string;  // For banner usage
    posterUrl?: string;    // For movie card usage
    overview?: string;     // For banner usage
  }
  