import React from 'react';
import { Box, Typography, Chip, IconButton } from '@mui/material';
import { Star, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { Content } from '../services';
import topgunImage from '../assets/topgun.png';

interface ContentHeroProps {
  content: Content;
}

export default function ContentHero({ content }: ContentHeroProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatReleaseYear = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '70vh',
        minHeight: '500px',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${content.imageUrl || topgunImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-end',
        color: 'white',
      }}
    >
      {/* Back Button */}
      <IconButton
        onClick={handleBack}
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
        }}
      >
        <ArrowBack />
      </IconButton>

      {/* Content Info */}
      <Box
        sx={{
          p: 4,
          pb: 6,
          maxWidth: '800px',
        }}
      >
        {/* Title */}
        <Typography
          variant="h2"
          sx={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontWeight: 'bold',
            mb: 2,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
          }}
        >
          {content.title}
        </Typography>

        {/* Metadata */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          {/* Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Star sx={{ color: '#FFD700', fontSize: '1.2rem' }} />
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {content.rating.toFixed(1)}
            </Typography>
          </Box>

          {/* Year */}
          <Typography variant="body1" sx={{ opacity: 0.8 }}>
            {formatReleaseYear(content.releaseDate)}
          </Typography>

          {/* Duration */}
          <Typography variant="body1" sx={{ opacity: 0.8 }}>
            {formatDuration(content.duration)}
          </Typography>

          {/* Type */}
          <Chip
            label={content.type === 'MOVIE' ? 'Movie' : 'Series'}
            size="small"
            sx={{
              backgroundColor: '#B8860BCC',
              color: 'white',
              fontWeight: 'bold',
            }}
          />
        </Box>

        {/* Genres */}
        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          {content.genres.map((genre, index) => (
            <Chip
              key={index}
              label={genre.name}
              variant="outlined"
              size="small"
              sx={{
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.5)',
                '&:hover': {
                  borderColor: 'white',
                },
              }}
            />
          ))}
        </Box>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.1rem',
            lineHeight: 1.6,
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
            maxWidth: '600px',
          }}
        >
          {content.description}
        </Typography>
      </Box>
    </Box>
  );
} 