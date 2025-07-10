import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Recommend as RecommendIcon,
  Movie as MovieIcon,
  Tv as TvIcon,
  RateReview as ReviewIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import logoDark from '../assets/logo_dark_menor.png';
import { useAuthContext } from '../contexts/AuthContext';

const menuItems = [
  { text: 'RECOMENDAÇÕES', icon: <RecommendIcon />, path: '/recommendations' },
  { text: 'MOVIES', icon: <MovieIcon />, path: '/movies' },
  { text: 'SERIES', icon: <TvIcon />, path: '/series' },
  { text: 'REVIEWS', icon: <ReviewIcon />, path: '/reviews' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        width: 320,
        height: '100vh',
        backgroundColor: '#1A1A1A',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #404040',
          transition: 'background-color 0.2s ease',
        }}
        onClick={() => handleNavigation('/')}
      >
        <img 
          src={logoDark} 
          alt="Luminary Logo" 
          style={{ 
            height: '150px',
            objectFit: 'contain'
          }} 
        />
      </Box>

      {/* Menu Items */}
      <List sx={{ flexGrow: 1, py: 2 }}>
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  mx: 2,
                  borderRadius: 1,
                  backgroundColor: isActive ? '#B8860B4D' : 'transparent',
                  color: isActive ? '#FFD700' : '#E8E8E8',
                  '&:hover': {
                    backgroundColor: isActive ? '#B8860B4D' : '#404040',
                  },
                  py: 1.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? '#FFD700' : '#E8E8E8',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '18px',
                    fontWeight: isActive ? 'bold' : 'normal',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Logout Button */}
      <Box sx={{ p: 2, borderTop: '1px solid #404040' }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 1,
            color: '#E8E8E8',
            '&:hover': {
              backgroundColor: '#404040',
            },
            py: 1.5,
          }}
        >
          <ListItemIcon sx={{ color: '#E8E8E8', minWidth: 40 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary="LOG OUT"
            primaryTypographyProps={{
              fontSize: '14px',
              fontFamily: 'Poppins, sans-serif',
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );
} 