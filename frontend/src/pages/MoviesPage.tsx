import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';
import Layout from '../components/Layout';
import SearchHeader from '../components/SearchHeader';
import FilterTabs from '../components/FilterTabs';
import MovieGrid from '../components/MovieGrid';
import { contentService, type Content } from '../services';
import topgunImage from '../assets/topgun.png';

// Função para converter dados da API para o formato esperado pelo MovieGrid
const convertContentToMovie = (content: Content, index: number) => ({
  id: index + 1, // Usar índice como ID numérico
  title: content.title,
  poster: content.imageUrl || topgunImage, // Usar imagem padrão se não houver URL
  rating: content.rating,
  year: new Date(content.releaseDate).getFullYear(),
  genre: content.genres && content.genres.length > 0 ? content.genres[0].name : 'Unknown',
  contentId: content.id, // Adicionar o ID real do conteúdo
});

export default function MoviesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [movies, setMovies] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>(['All']);

  // Carregar filmes da API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const moviesData = await contentService.getContentsByType('movies');
        setMovies(moviesData);
        
        // Extrair gêneros únicos para os filtros
        const allGenres = moviesData.flatMap(movie => 
          movie.genres ? movie.genres.map(genre => genre.name) : []
        );
        const uniqueGenres = Array.from(new Set(allGenres));
        setCategories(['All', ...uniqueGenres]);
      } catch (err) {
        console.error('Erro ao carregar filmes:', err);
        setError('Erro ao carregar filmes. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Filtrar filmes baseado na busca e categoria
  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || 
      (movie.genres && movie.genres.some(genre => genre.name === activeCategory));
    return matchesSearch && matchesCategory;
  });

  // Converter para o formato esperado pelo MovieGrid
  const moviesForGrid = filteredMovies.map((movie, index) => convertContentToMovie(movie, index));

  return (
    <Layout disableContainer>
      {/* Header with Search */}
      <SearchHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        title="Movies"
        placeholder="Search for movies..."
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
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {/* Filter Tabs */}
            <FilterTabs
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            {/* Movies Grid */}
            <MovieGrid movies={moviesForGrid} />
          </>
        )}
      </Box>
    </Layout>
  );
} 