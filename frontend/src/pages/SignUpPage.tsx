import React from 'react';
import { Box } from '@mui/material';
import UserSignUp from '../components/UserSignUpForm';
import avatarImage from '../assets/avatar.png';

export default function SignUpPage() {
  return (
    <Box sx={{ 
      display: 'flex', 
      height: '100vh', 
      width: '100vw',
      overflow: 'hidden'
    }}>
      <Box
        sx={{
          flex: '0 0 50%',
          backgroundImage: `url(${avatarImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <Box
        sx={{
          flex: '0 0 50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1A1A1A',
          padding: 0,
          margin: 0
        }}
      >
        <UserSignUp />
      </Box>
    </Box>
  );
} 