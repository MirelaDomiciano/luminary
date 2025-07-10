import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logoDark from '../assets/logo_dark.png';
import { authService, type LoginData } from '../services';
import { useAuthContext } from '../contexts/AuthContext';

// Estilo reutilizável para todos os TextField
const textFieldStyle = {
  mb: 3,
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#2A2A2A',
    height: '60px',
    fontSize: '22px',
    '& fieldset': { borderColor: '#444' },
    '&:hover fieldset': { borderColor: '#666' },
    '&.Mui-focused fieldset': { borderColor: '#FFD700' },
  },
  '& .MuiInputLabel-root': { 
    color: '#E8E8E8',
    fontSize: '22px',
    '&.Mui-focused': { color: '#FFF' }
  },
  '& .MuiOutlinedInput-input': { 
    color: '#FFF',
    fontSize: '22px'
  },
  '& .MuiOutlinedInput-input:focus': { color: '#FFF' },
  '& .Mui-focused .MuiOutlinedInput-input': { color: '#FFF' },
  '& input:-webkit-autofill': {
    WebkitBoxShadow: '0 0 0 100px #2A2A2A inset',
    WebkitTextFillColor: '#FFF',
    color: '#FFF',
  },
};

export default function UserSignIn() {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };
    
    if (!form.email) {
      newErrors.email = 'Email is required.';
      valid = false;
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }
    if (!form.password) {
      newErrors.password = 'Password is required.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
    
    if (!validate()) {
      return;
    }

    setLoading(true);
    
    try {
      const loginData: LoginData = {
        email: form.email,
        password: form.password,
      };

      const response = await authService.login(loginData);
      
      // Usar o contexto para fazer login
      login(response.token, response.user);
      
      setSuccess(true);
      
      // Redirecionar após login bem-sucedido
      setTimeout(() => {
        navigate('/home');
      }, 1500);
      
    } catch (error: any) {
      console.error('Login error:', error);
      
      if (error.response?.data?.message) {
        setApiError(error.response.data.message);
      } else {
        setApiError('Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: 600, p: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <img 
          src={logoDark} 
          alt="Luminary Logo" 
          style={{ 
            height: '200px',
            objectFit: 'contain'
          }} 
        />
      </Box>
      
      <Typography 
        variant="h4" 
        sx={{ 
          color: '#FFF', 
          fontWeight: 600, 
          mb: 2,
          fontFamily: '"Bebas Neue", sans-serif',
          textAlign: 'center',
          fontSize: '40px'
        }}
      >
        Welcome back
      </Typography>
      <Typography 
        variant="body1" 
        sx={{ 
          color: '#E8E8E8', 
          mb: 5,
          fontFamily: 'Poppins, sans-serif',
          textAlign: 'center',
          fontSize: '20px'
        }}
      >
        Sign in to continue your cinematic journey!
      </Typography>
      
      {apiError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {apiError}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Login realizado com sucesso! Redirecionando...
        </Alert>
      )}
      
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
          sx={textFieldStyle}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password}
          sx={{ ...textFieldStyle, mb: 4 }}
        />
        
        <Button 
          type="submit" 
          variant="contained" 
          fullWidth 
          disabled={loading}
          sx={{ 
            mt: 3, 
            mb: 3,
            py: 2,
            height: '60px',
            backgroundColor: 'rgba(184, 134, 11, 0.80)',
            color: '#FFF',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            textTransform: 'none',
            fontSize: '22px',
            '&:hover': {
              backgroundColor: 'rgba(184, 134, 11, 1)',
            },
            '&:disabled': {
              backgroundColor: 'rgba(184, 134, 11, 0.50)',
            }
          }}
        >
          {loading ? 'Fazendo login...' : 'Sign in'}
        </Button>
        
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#E8E8E8', 
            textAlign: 'center',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '20px'
          }}
        >
          Don't have an account?{' '}
          <Link 
            href="/signup" 
            sx={{ 
              color: '#FFD700', 
              textDecoration: 'none',
              fontSize: '20px',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            Sign up
          </Link>
        </Typography>
      </form>
    </Box>
  );
}
