import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Alert } from '@mui/material';
import Layout from '../components/Layout';
import ContentHero from '../components/ContentHero';
import ContentInfo from '../components/ContentInfo';
import ContentActions from '../components/ContentActions';
import ContentCast from '../components/ContentCast';
import ContentRecommendations from '../components/ContentRecommendations';
import { contentService, type Content } from '../services';

export default function ContentDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      if (!id) {
        setError('Content ID not provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const contentData = await contentService.getContentById(id);
        setContent(contentData);
      } catch (err) {
        console.error('Error fetching content:', err);
        setError('Failed to load content details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
          }}
        >
          <CircularProgress sx={{ color: '#B8860BCC' }} />
        </Box>
      </Layout>
    );
  }

  if (error || !content) {
    return (
      <Layout>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
          }}
        >
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout disableContainer>
      {/* Hero Section */}
      <ContentHero content={content} />

      <Box sx={{ px: 4, py: 4, pt: 3 }}>
        {/* Content Info and Actions */}
        <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
          <Box sx={{ flex: 1 }}>
            <ContentInfo content={content} />
          </Box>
          <Box sx={{ minWidth: '300px' }}>
            <ContentActions content={content} />
          </Box>
        </Box>

        {/* Cast and Crew */}
        <ContentCast content={content} />

        {/* Recommendations */}
        <ContentRecommendations content={content} />
      </Box>
    </Layout>
  );
} 