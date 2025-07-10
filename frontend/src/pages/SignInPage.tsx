import React from 'react';
import { Box } from '@mui/material';
import UserSignIn from '../components/UserSignInForm';
import topGun from '../assets/topgun.jpeg';

export default function SignInPage() {
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
          backgroundImage: `url(${topGun})`,
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
        <UserSignIn />
      </Box>
    </Box>
  );
}
