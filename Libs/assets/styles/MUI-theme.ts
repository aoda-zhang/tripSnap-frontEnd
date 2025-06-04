import { createTheme } from '@mui/material/styles';

const MUITheme = createTheme({
  palette: {
    primary: { main: '#8b0000' }, // Dark Red
    secondary: { main: '#f59e0b' }, // Amber
  },
  spacing: 8,
});

export default MUITheme;
