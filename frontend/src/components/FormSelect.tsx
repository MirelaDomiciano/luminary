import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

interface Option {
  id: string;
  name: string;
}

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  options: Option[];
  error?: boolean;
  helperText?: string;
  required?: boolean;
}

export default function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  error,
  helperText,
  required = false,
}: FormSelectProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(name, event.target.value);
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
        value={value}
        onChange={handleChange}
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
            {option.name}
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