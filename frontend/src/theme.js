import { createTheme } from '@mui/material/styles';

// These are the themes to be used on the frontend app
const theme = createTheme({
  palette: {
    primary: {
      main: '#5ACCCC',
    },
    secondary: {
      main: '#FABD33',
    },
    text: {
      primary: '#335C6E',
    },
    background: {
      default: '#F7F7F7',
    },
  },
  typography: {
    fontFamily: 'Mulish, Arial, sans-serif',
  },
});

export default theme;
