import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import type { Content } from '../services';

interface ContentInfoProps {
  content: Content;
}

export default function ContentInfo({ content }: ContentInfoProps) {
  const formatReleaseDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#2A2A2A',
        borderRadius: 2,
        p: 3,
        color: 'white',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontFamily: '"Bebas Neue", sans-serif',
          mb: 3,
          color: '#FFD700',
        }}
      >
        Details
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Release Date */}
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: '#B0B0B0',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              mb: 0.5,
            }}
          >
            Release Date
          </Typography>
          <Typography variant="body1">
            {formatReleaseDate(content.releaseDate)}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: '#404040' }} />

        {/* Duration */}
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: '#B0B0B0',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              mb: 0.5,
            }}
          >
            Duration
          </Typography>
          <Typography variant="body1">
            {formatDuration(content.duration)}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: '#404040' }} />

        {/* Studio */}
        {content.studio && (
          <>
            <Box>
              <Typography
                variant="body2"
                sx={{
                  color: '#B0B0B0',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  mb: 0.5,
                }}
              >
                Studio
              </Typography>
              <Typography variant="body1">
                {content.studio}
              </Typography>
            </Box>
            <Divider sx={{ borderColor: '#404040' }} />
          </>
        )}

        {/* Box Office (Movies only) */}
        {content.type === 'MOVIE' && content.boxOffice && (
          <>
            <Box>
              <Typography
                variant="body2"
                sx={{
                  color: '#B0B0B0',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  mb: 0.5,
                }}
              >
                Box Office
              </Typography>
              <Typography variant="body1">
                {formatCurrency(content.boxOffice)}
              </Typography>
            </Box>
            <Divider sx={{ borderColor: '#404040' }} />
          </>
        )}

        {/* Series specific info */}
        {content.type === 'SERIES' && (
          <>
            {content.numberOfSeasons && (
              <>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#B0B0B0',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      mb: 0.5,
                    }}
                  >
                    Seasons
                  </Typography>
                  <Typography variant="body1">
                    {content.numberOfSeasons}
                  </Typography>
                </Box>
                <Divider sx={{ borderColor: '#404040' }} />
              </>
            )}

            {content.currentStatus && (
              <>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#B0B0B0',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      mb: 0.5,
                    }}
                  >
                    Status
                  </Typography>
                  <Typography variant="body1">
                    {content.currentStatus}
                  </Typography>
                </Box>
                <Divider sx={{ borderColor: '#404040' }} />
              </>
            )}
          </>
        )}

        {/* Genres */}
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: '#B0B0B0',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              mb: 0.5,
            }}
          >
            Genres
          </Typography>
          <Typography variant="body1">
            {content.genres.map(genre => genre.name).join(', ')}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: '#404040' }} />

        {/* Rating */}
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: '#B0B0B0',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              mb: 0.5,
            }}
          >
            Rating
          </Typography>
          <Typography variant="body1" sx={{ color: '#FFD700', fontWeight: 'bold' }}>
            {content.rating.toFixed(1)} / 5.0
          </Typography>
        </Box>
      </Box>
    </Box>
  );
} 