import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Chip,
  Box,
  FormHelperText,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

interface Option {
  id: string;
  name: string;
}

interface FormMultiSelectProps {
  label: string;
  name: string;
  value: string[];
  onChange: (name: string, value: string[]) => void;
  options: Option[];
  error?: boolean;
  helperText?: string;
  required?: boolean;
}

export default function FormMultiSelect({
  label,
  name,
  value,
  onChange,
  options,
  error,
  helperText,
  required = false,
}: FormMultiSelectProps) {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const newValue = event.target.value as string[];
    onChange(name, newValue);
  };

  const getSelectedNames = () => {
    return options
      .filter(option => value.includes(option.id))
      .map(option => option.name);
  };

  return (
    <FormControl 
      fullWidth 
      margin="normal" 
      error={error}
      sx={{ mb: 3 }}
    >
      <InputLabel
        sx={{
          color: '#E8E8E8',
          fontSize: '16px',
          '&.Mui-focused': { color: '#FFD700' },
          '&.Mui-error': { color: '#f44336' },
        }}
      >
        {label} {required && '*'}
      </InputLabel>
      <Select
        multiple
        value={value}
        onChange={handleChange}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {getSelectedNames().map((name) => (
              <Chip
                key={name}
                label={name}
                size="small"
                sx={{
                  backgroundColor: '#FFD700',
                  color: '#1A1A1A',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '12px',
                }}
              />
            ))}
          </Box>
        )}
        sx={{
          backgroundColor: '#2A2A2A',
          minHeight: '60px',
          '& fieldset': { borderColor: '#444' },
          '&:hover fieldset': { borderColor: '#666' },
          '&.Mui-focused fieldset': { borderColor: '#FFD700' },
          '& .MuiSelect-select': {
            color: '#FFF',
            fontSize: '16px',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.id}
            value={option.id}
            sx={{
              backgroundColor: '#2A2A2A',
              color: '#E8E8E8',
              '&:hover': {
                backgroundColor: '#404040',
              },
              '&.Mui-selected': {
                backgroundColor: '#FFD700',
                color: '#1A1A1A',
                '&:hover': {
                  backgroundColor: '#B8860B',
                },
              },
            }}
          >
            <Checkbox
              checked={value.includes(option.id)}
              sx={{
                color: '#E8E8E8',
                '&.Mui-checked': {
                  color: '#FFD700',
                },
              }}
            />
            <ListItemText
              primary={option.name}
              sx={{
                '& .MuiTypography-root': {
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '14px',
                },
              }}
            />
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <FormHelperText
          sx={{
            color: error ? '#f44336' : '#B0B0B0',
            fontSize: '14px',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
} 