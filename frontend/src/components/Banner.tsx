// Banner.tsx
import React from 'react';
import { Movie } from '../types/Movie';


interface BannerProps {
  movie: Movie;
}

const Banner: React.FC<BannerProps> = ({ movie }) => {
  return (
    <div
      className="banner mb-5"
      style={{
        background: `url(${movie.bannerImage}) center/cover no-repeat`,
        height: '60vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '20px'
      }}
    >
      <div className="banner-content" style={{ maxWidth: '600px' }}>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <button className="btn btn-secondary">Watch Now</button>
      </div>
    </div>
  );
};

export default Banner;
