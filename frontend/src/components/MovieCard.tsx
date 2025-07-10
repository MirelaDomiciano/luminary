import React from 'react';
import { Box, Typography, Rating } from '@mui/material';
import { Star as StarIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  id: number;
  title: string;
  poster: string;
  rating: number;
  year?: number;
  genre?: string;
  contentId?: string; // ID real do conteúdo da API
}

export default function MovieCard({ id, title, poster, rating, year, genre, contentId }: MovieCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Usar contentId se disponível, senão usar id
    const detailsId = contentId || id.toString();
    navigate(`/content/${detailsId}`);
  };
  return (
    <Box
      onClick={handleClick}
      sx={{
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      {/* Movie Poster */}
      <Box
        sx={{
          width: '100%',
          height: '300px',
          backgroundImage: `url(${poster})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        {/* Rating Badge */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderRadius: '50%',
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFD700',
          }}
        >
          <StarIcon sx={{ fontSize: 16, mr: 0.5 }} />
          <Typography
            variant="caption"
            sx={{
              color: '#FFD700',
              fontWeight: 'bold',
              fontSize: '12px',
            }}
          >
            {rating.toFixed(1)}
          </Typography>
        </Box>
      </Box>

      {/* Movie Info */}
      <Box
        sx={{
          p: 2,
          backgroundColor: '#2A2A2A',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#FFF',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 'bold',
            fontSize: '16px',
            mb: 0.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </Typography>
        
        {year && (
          <Typography
            variant="body2"
            sx={{
              color: '#B0B0B0',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '14px',
            }}
          >
            {year}
          </Typography>
        )}
        
        {genre && (
          <Typography
            variant="body2"
            sx={{
              color: '#FFD700',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '12px',
              mt: 0.5,
            }}
          >
            {genre}
          </Typography>
        )}
      </Box>
    </Box>
  );
} 