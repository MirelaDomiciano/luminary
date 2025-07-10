import React from 'react';
import { Typography, Box } from '@mui/material';
import MovieCard from './MovieCard';

interface Movie {
  id: number;
  title: string;
  poster: string;
  rating: number;
  year?: number;
  genre?: string;
  contentId?: string;
}

interface MovieGridProps {
  movies: Movie[];
  title?: string;
}

export default function MovieGrid({ movies, title }: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '300px',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#B0B0B0',
            fontFamily: 'Poppins, sans-serif',
            textAlign: 'center',
          }}
        >
          No movies found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 4 }}>
      {title && (
        <Typography
          variant="h5"
          sx={{
            color: '#FFF',
            fontFamily: '"Bebas Neue", sans-serif',
            mb: 3,
            fontSize: '24px',
          }}
        >
          {title}
        </Typography>
      )}
      
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 3,
        }}
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={movie.poster}
            rating={movie.rating}
            year={movie.year}
            genre={movie.genre}
            contentId={movie.contentId}
          />
        ))}
      </Box>
    </Box>
  );
} 