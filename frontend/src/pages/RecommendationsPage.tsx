import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert, Divider } from '@mui/material';
import Layout from '../components/Layout';
import SearchHeader from '../components/SearchHeader';
import MovieGrid from '../components/MovieGrid';
import { contentService, userPreferencesService, type Content, type UserPreferences } from '../services';
import topgunImage from '../assets/topgun.png';

// Função para converter dados da API para o formato esperado pelo MovieGrid
const convertContentToMovie = (content: Content, index: number) => ({
  id: index + 1,
  title: content.title,
  poster: content.imageUrl || topgunImage,
  rating: content.rating,
  year: new Date(content.releaseDate).getFullYear(),
  genre: content.genres && content.genres.length > 0 ? content.genres[0].name : 'Unknown',
  contentId: content.id,
});

export default function RecommendationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [genreRecommendations, setGenreRecommendations] = useState<Content[]>([]);
  const [actorRecommendations, setActorRecommendations] = useState<Content[]>([]);
  const [directorRecommendations, setDirectorRecommendations] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError(null);

        // Buscar preferências do usuário
        let preferences;
        try {
          preferences = await userPreferencesService.getUserPreferences();
        } catch (prefError: any) {
          console.error('Erro ao buscar preferências:', prefError);
          if (prefError.response?.status === 404) {
            setError('Você ainda não configurou suas preferências. Configure suas preferências para ver recomendações personalizadas.');
          } else {
            setError('Erro ao carregar suas preferências. Tente novamente mais tarde.');
          }
          setLoading(false);
          return;
        }
        
        if (!preferences || preferences.length === 0) {
          setError('Você ainda não configurou suas preferências. Configure suas preferências para ver recomendações personalizadas.');
          setLoading(false);
          return;
        }

        const userPref = preferences[0];
        setUserPreferences(userPref);

        // Buscar todos os conteúdos
        const allContents = await contentService.getAllContents();

        // Filtrar conteúdos baseados nos gêneros preferidos
        const genreIds = userPref.genres.map(g => g.id);
        const genreBasedContent = allContents.filter(content =>
          content.genres.some(genre => genreIds.includes(genre.id))
        );

        // Filtrar conteúdos baseados nos atores preferidos
        const actorIds = userPref.actors.map(a => a.id);
        const actorBasedContent = allContents.filter(content =>
          content.actors && content.actors.some(actor => actorIds.includes(actor.id))
        );

        // Filtrar conteúdos baseados nos diretores preferidos
        const directorIds = userPref.directors.map(d => d.id);
        const directorBasedContent = allContents.filter(content =>
          (content.directors && content.directors.some(director => directorIds.includes(director.id))) ||
          (content.director && directorIds.includes(content.director.id))
        );

        // Ordenar por rating e limitar a 8 itens cada
        setGenreRecommendations(genreBasedContent.sort((a, b) => b.rating - a.rating).slice(0, 8));
        setActorRecommendations(actorBasedContent.sort((a, b) => b.rating - a.rating).slice(0, 8));
        setDirectorRecommendations(directorBasedContent.sort((a, b) => b.rating - a.rating).slice(0, 8));

      } catch (err) {
        console.error('Erro ao carregar recomendações:', err);
        setError('Erro ao carregar recomendações. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  // Filtrar recomendações baseado na busca
  const filterBySearch = (contents: Content[]) => {
    if (!searchTerm) return contents;
    return contents.filter(content =>
      content.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredGenreRecommendations = filterBySearch(genreRecommendations);
  const filteredActorRecommendations = filterBySearch(actorRecommendations);
  const filteredDirectorRecommendations = filterBySearch(directorRecommendations);

  return (
    <Layout disableContainer>
      {/* Header with Search */}
      <SearchHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        title="Recomendações"
        placeholder="Buscar nas suas recomendações..."
      />

      <Box sx={{ px: 4, pt: 3 }}>
        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress sx={{ color: '#FF6B35' }} />
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Alert severity="info" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Content */}
        {!loading && !error && userPreferences && (
          <>
            {/* Description */}
            <Typography
              variant="body1"
              sx={{
                color: '#E8E8E8',
                fontFamily: 'Poppins, sans-serif',
                mb: 4,
                fontSize: '16px',
              }}
            >
              Conteúdo recomendado baseado nas suas preferências pessoais de gêneros, atores e diretores.
            </Typography>

            {/* Seção de Gêneros */}
            {filteredGenreRecommendations.length > 0 && (
              <Box sx={{ mb: 6 }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: '#FFD700',
                    fontFamily: '"Bebas Neue", sans-serif',
                    mb: 2,
                    fontSize: '28px',
                  }}
                >
                  Baseado nos seus gêneros favoritos
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#B0B0B0',
                    fontFamily: 'Poppins, sans-serif',
                    mb: 3,
                    fontSize: '14px',
                  }}
                >
                  {userPreferences.genres.map(g => g.name).join(', ')}
                </Typography>
                <MovieGrid movies={filteredGenreRecommendations.map(convertContentToMovie)} />
                <Divider sx={{ backgroundColor: '#333', my: 4 }} />
              </Box>
            )}

            {/* Seção de Atores */}
            {filteredActorRecommendations.length > 0 && (
              <Box sx={{ mb: 6 }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: '#FFD700',
                    fontFamily: '"Bebas Neue", sans-serif',
                    mb: 2,
                    fontSize: '28px',
                  }}
                >
                  Baseado nos seus atores favoritos
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#B0B0B0',
                    fontFamily: 'Poppins, sans-serif',
                    mb: 3,
                    fontSize: '14px',
                  }}
                >
                  {userPreferences.actors.map(a => a.name).join(', ')}
                </Typography>
                <MovieGrid movies={filteredActorRecommendations.map(convertContentToMovie)} />
                <Divider sx={{ backgroundColor: '#333', my: 4 }} />
              </Box>
            )}

            {/* Seção de Diretores */}
            {filteredDirectorRecommendations.length > 0 && (
              <Box sx={{ mb: 6 }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: '#FFD700',
                    fontFamily: '"Bebas Neue", sans-serif',
                    mb: 2,
                    fontSize: '28px',
                  }}
                >
                  Baseado nos seus diretores favoritos
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#B0B0B0',
                    fontFamily: 'Poppins, sans-serif',
                    mb: 3,
                    fontSize: '14px',
                  }}
                >
                  {userPreferences.directors.map(d => d.name).join(', ')}
                </Typography>
                <MovieGrid movies={filteredDirectorRecommendations.map(convertContentToMovie)} />
              </Box>
            )}

            {/* Mensagem quando não há recomendações */}
            {filteredGenreRecommendations.length === 0 && 
             filteredActorRecommendations.length === 0 && 
             filteredDirectorRecommendations.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#B0B0B0',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  {searchTerm 
                    ? 'Nenhuma recomendação encontrada para sua busca.'
                    : 'Não encontramos recomendações baseadas nas suas preferências no momento.'
                  }
                </Typography>
              </Box>
            )}
          </>
        )}
      </Box>
    </Layout>
  );
} 