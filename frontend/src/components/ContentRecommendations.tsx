import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import MovieGrid from './MovieGrid';
import { contentService, type Content } from '../services';
import topgunImage from '../assets/topgun.png';

interface ContentRecommendationsProps {
  content: Content;
}

// Função para converter dados da API para o formato esperado pelo MovieGrid
const convertContentToMovie = (content: Content, index: number) => ({
  id: index + 1,
  title: content.title,
  poster: content.imageUrl || topgunImage,
  rating: content.rating,
  year: new Date(content.releaseDate).getFullYear(),
  genre: content.genres && content.genres.length > 0 ? content.genres[0].name : 'Unknown',
  contentId: content.id, // Adicionar o ID real do conteúdo
});

export default function ContentRecommendations({ content }: ContentRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Buscar conteúdos do mesmo tipo
        const allContent = await contentService.getContentsByType(
          content.type === 'MOVIE' ? 'movies' : 'series'
        );
        
        // Filtrar conteúdos similares (mesmo gênero, excluindo o atual)
        const similarContent = allContent
          .filter(item => item.id !== content.id) // Excluir o conteúdo atual
          .filter(item => {
            // Verificar se tem gêneros em comum
            const contentGenres = content.genres.map(g => g.name);
            const itemGenres = item.genres.map(g => g.name);
            return contentGenres.some(genre => itemGenres.includes(genre));
          })
          .sort((a, b) => b.rating - a.rating) // Ordenar por rating
          .slice(0, 8); // Limitar a 8 recomendações

        setRecommendations(similarContent);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError('Failed to load recommendations');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [content]);

  if (loading) {
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
          You might also like
        </Typography>
        
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px',
            backgroundColor: '#2A2A2A',
            borderRadius: 2,
          }}
        >
          <CircularProgress sx={{ color: '#B8860BCC' }} />
        </Box>
      </Box>
    );
  }

  if (error || recommendations.length === 0) {
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
          You might also like
        </Typography>
        
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px',
            backgroundColor: '#2A2A2A',
            borderRadius: 2,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: '#B0B0B0',
              fontStyle: 'italic',
            }}
          >
            {error || 'No recommendations available'}
          </Typography>
        </Box>
      </Box>
    );
  }

  // Converter para o formato esperado pelo MovieGrid
  const recommendationsForGrid = recommendations.map((item, index) => 
    convertContentToMovie(item, index)
  );

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
        You might also like
      </Typography>

      <Box
        sx={{
          backgroundColor: '#2A2A2A',
          borderRadius: 2,
          p: 3,
        }}
      >
        <MovieGrid movies={recommendationsForGrid} />
      </Box>
    </Box>
  );
} 