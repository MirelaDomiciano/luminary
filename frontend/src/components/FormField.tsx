import React from 'react';
import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material/TextField';

interface FormFieldProps extends Omit<TextFieldProps, 'sx'> {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  multiline?: boolean;
  rows?: number;
  type?: string;
  required?: boolean;
}

export default function FormField({
  label,
  name,
  value,
  onChange,
  error,
  helperText,
  multiline = false,
  rows = 1,
  type = 'text',
  required = false,
  ...props
}: FormFieldProps) {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
      error={error}
      helperText={helperText}
      multiline={multiline}
      rows={multiline ? rows : undefined}
      type={type}
      required={required}
      sx={{
        mb: 3,
        '& .MuiOutlinedInput-root': {
          backgroundColor: '#2A2A2A',
          minHeight: multiline ? 'auto' : '60px',
          fontSize: '16px',
          '& fieldset': { borderColor: '#444' },
          '&:hover fieldset': { borderColor: '#666' },
          '&.Mui-focused fieldset': { borderColor: '#FFD700' },
        },
        '& .MuiInputLabel-root': { 
          color: '#E8E8E8',
          fontSize: '16px',
          '&.Mui-focused': { color: '#FFD700' },
          '&.Mui-error': { color: '#f44336' },
        },
        '& .MuiOutlinedInput-input': { 
          color: '#FFF',
          fontSize: '16px',
        },
        '& .MuiFormHelperText-root': {
          color: error ? '#f44336' : '#B0B0B0',
          fontSize: '14px',
          fontFamily: 'Poppins, sans-serif',
        },
      }}
      {...props}
    />
  );
} 