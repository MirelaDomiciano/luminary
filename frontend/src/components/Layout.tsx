import React from 'react';
import { Box, Container } from '@mui/material';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  disableContainer?: boolean;
}

export default function Layout({ children, maxWidth = 'lg', disableContainer = false }: LayoutProps) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      
      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: '320px', // Width of sidebar
          backgroundColor: '#151515',
          minHeight: '100vh',
        }}
      >
        {disableContainer ? (
          <Box sx={{ py: 4 }}>
            {children}
          </Box>
        ) : (
          <Container maxWidth={maxWidth} sx={{ py: 4 }}>
            {children}
          </Container>
        )}
      </Box>
    </Box>
  );
} 