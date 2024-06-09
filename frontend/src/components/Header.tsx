import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Mulish, Arial, sans-serif' }}>
          Ello Books
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
