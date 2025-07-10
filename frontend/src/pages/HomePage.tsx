import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Sidebar from '../components/Sidebar';

export default function HomePage() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      
      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: '280px', // Width of sidebar
          backgroundColor: '#151515',
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography
            variant="h3"
            sx={{
              color: '#FFF',
              fontFamily: '"Bebas Neue", sans-serif',
              mb: 3,
            }}
          >
            Welcome to Luminary
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              color: '#E8E8E8',
              fontFamily: 'Poppins, sans-serif',
              mb: 4,
            }}
          >
            Your cinematic journey starts here!
          </Typography>
          
          {/* Placeholder content - you can add your main content here */}
          <Box
            sx={{
              backgroundColor: '#2A2A2A',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: '#E8E8E8',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              This is your main content area. You can add movies, series, and other content here.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
} 