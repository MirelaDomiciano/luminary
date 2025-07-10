import React from 'react';
import { Box, Typography, Avatar, Chip } from '@mui/material';
import { Person, DirectionsRun } from '@mui/icons-material';
import type { Content } from '../services';

interface ContentCastProps {
  content: Content;
}

export default function ContentCast({ content }: ContentCastProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h5"
        sx={{
          fontFamily: '"Bebas Neue", sans-serif',
          color: '#FFD700',
          mb: 3,
        }}
      >
        Cast & Crew
      </Typography>

      <Box
        sx={{
          backgroundColor: '#2A2A2A',
          borderRadius: 2,
          p: 3,
          color: 'white',
        }}
      >
        {/* Director */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 'bold',
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <DirectionsRun sx={{ color: '#B8860B' }} />
            Director
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              sx={{
                width: 60,
                height: 60,
                backgroundColor: '#B8860BCC',
              }}
            >
              <Person />
            </Avatar>
            <Box>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                }}
              >
                {content.director.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#B0B0B0',
                }}
              >
                Director
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Cast */}
        {content.actors && content.actors.length > 0 && (
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 'bold',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Person sx={{ color: '#B8860B' }} />
              Cast
            </Typography>

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
              {content.actors.map((actor, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    backgroundColor: '#404040',
                    borderRadius: 1,
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#505050',
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 50,
                      height: 50,
                      backgroundColor: '#B8860BCC',
                    }}
                  >
                    <Person />
                  </Avatar>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '0.95rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {actor.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#B0B0B0',
                        fontSize: '0.85rem',
                      }}
                    >
                      Actor
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Show message if no cast available */}
        {(!content.actors || content.actors.length === 0) && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography
              variant="body1"
              sx={{
                color: '#B0B0B0',
                fontStyle: 'italic',
              }}
            >
              Cast information not available
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
} 