import React from 'react';
import { Box, Button } from '@mui/material';

interface FilterTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function FilterTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: FilterTabsProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        mb: 4,
        flexWrap: 'wrap',
      }}
    >
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => onCategoryChange(category)}
          sx={{
            px: 3,
            py: 1,
            borderRadius: '20px',
            backgroundColor: activeCategory === category ? '#FFD700' : '#2A2A2A',
            color: activeCategory === category ? '#000' : '#E8E8E8',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: activeCategory === category ? 'bold' : 'normal',
            textTransform: 'none',
            fontSize: '14px',
            border: '1px solid',
            borderColor: activeCategory === category ? '#FFD700' : '#444',
            '&:hover': {
              backgroundColor: activeCategory === category ? '#B8860B' : '#404040',
              borderColor: activeCategory === category ? '#B8860B' : '#666',
            },
          }}
        >
          {category}
        </Button>
      ))}
    </Box>
  );
} 