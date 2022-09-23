import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#1600ff',
    },
    secondary: {
      main: '#9a00ff',
    },
    background: {
      default: '#edfbfb',
    },
  },
  typography: {
    fontFamily: `'Poppins', sans-serif`,
    button: {
      textTransform: "none"
    }
  },
  shape: {
    borderRadius: "10px",
  },
});

export default theme;