import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Box, Container, Tabs, Tab, CircularProgress, Alert } from '@mui/material';
import Sidebar from '../components/Sidebar';
import MovieForm from '../components/MovieForm';
import SeriesForm from '../components/SeriesForm';
import { contentService, type Content } from '../services';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`content-tabpanel-${index}`}
      aria-labelledby={`content-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function EditContentPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchContent = async () => {
      // Primeiro, tentar obter o conteúdo do state da navegação
      const stateContent = location.state?.editContent as Content;
      
      if (stateContent) {
        setContent(stateContent);
        setTabValue(stateContent.type === 'MOVIE' ? 0 : 1);
        setLoading(false);
        return;
      }

      // Se não há conteúdo no state, buscar pela API usando o ID
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
        setTabValue(contentData.type === 'MOVIE' ? 0 : 1);
      } catch (err) {
        console.error('Error fetching content:', err);
        setError('Failed to load content for editing. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id, location.state]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <Box
          sx={{
            flexGrow: 1,
            marginLeft: '320px',
            backgroundColor: '#1A1A1A',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress sx={{ color: '#B8860BCC' }} />
        </Box>
      </Box>
    );
  }

  if (error || !content) {
    return (
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <Box
          sx={{
            flexGrow: 1,
            marginLeft: '320px',
            backgroundColor: '#1A1A1A',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Container maxWidth="md">
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </Container>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      
      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: '320px',
          backgroundColor: '#1A1A1A',
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Content Type Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: '#333', mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                '& .MuiTab-root': {
                  color: '#E8E8E8',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  textTransform: 'none',
                  '&.Mui-selected': {
                    color: '#FFD700',
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#FFD700',
                },
              }}
            >
              <Tab label="Edit Movie" disabled={content.type !== 'MOVIE'} />
              <Tab label="Edit Series" disabled={content.type !== 'SERIES'} />
            </Tabs>
          </Box>

          {/* Tab Panels */}
          <TabPanel value={tabValue} index={0}>
            {content.type === 'MOVIE' && <MovieForm editContent={content} />}
          </TabPanel>
          
          <TabPanel value={tabValue} index={1}>
            {content.type === 'SERIES' && <SeriesForm editContent={content} />}
          </TabPanel>
        </Container>
      </Box>
    </Box>
  );
} 