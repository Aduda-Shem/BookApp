// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import logo from '../logo.jpg';

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box component="img" src={logo} alt="Kids Reading App Logo" sx={{ height: 40, marginRight: 2 }} />
        <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Mulish, Arial, sans-serif' }}>
          Ello Books
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
