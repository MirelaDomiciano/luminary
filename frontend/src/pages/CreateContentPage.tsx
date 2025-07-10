import React, { useState } from 'react';
import { Box, Container, Typography, Tabs, Tab } from '@mui/material';
import Sidebar from '../components/Sidebar';
import MovieForm from '../components/MovieForm';
import SeriesForm from '../components/SeriesForm';

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
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function CreateContentPage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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
        {/* Header */}
        <Box
          sx={{
            p: 3,
            borderBottom: '1px solid #333',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: '#FFF',
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '32px',
              mb: 2,
            }}
          >
            Create New Content
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              color: '#E8E8E8',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '16px',
            }}
          >
            Add a new movie or series to the platform
          </Typography>
        </Box>

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
              <Tab label="Movie" />
              <Tab label="Series" />
            </Tabs>
          </Box>

          {/* Tab Panels */}
          <TabPanel value={tabValue} index={0}>
            <MovieForm />
          </TabPanel>
          
          <TabPanel value={tabValue} index={1}>
            <SeriesForm />
          </TabPanel>
        </Container>
      </Box>
    </Box>
  );
} 