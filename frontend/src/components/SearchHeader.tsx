import React from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  IconButton,
} from '@mui/material';
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface SearchHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  title: string;
  placeholder?: string;
}

export default function SearchHeader({
  searchTerm,
  onSearchChange,
  title,
  placeholder = "Search..."
}: SearchHeaderProps) {
  const navigate = useNavigate();

  const handleCreateContent = () => {
    navigate('/create-content');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 3,
        borderBottom: '1px solid #333',
      }}
    >
      {/* Search Bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Typography
          variant="h4"
          sx={{
            color: '#FFF',
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '32px',
            minWidth: 'fit-content',
          }}
        >
          {title}
        </Typography>
        
        <TextField
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{
            width: '400px',
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#2A2A2A',
              borderRadius: '25px',
              '& fieldset': { borderColor: '#444' },
              '&:hover fieldset': { borderColor: '#666' },
              '&.Mui-focused fieldset': { borderColor: '#FFD700' },
            },
            '& .MuiInputBase-input': {
              color: '#E8E8E8',
              '&::placeholder': {
                color: '#888',
                opacity: 1,
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#888' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Create Content Button */}
      <IconButton
        onClick={handleCreateContent}
        sx={{
          width: 50,
          height: 50,
          backgroundColor: '#FFD700',
          color: '#1A1A1A',
          '&:hover': {
            backgroundColor: '#B8860B',
          },
        }}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
} 