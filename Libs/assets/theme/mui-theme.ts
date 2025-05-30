import { createTheme } from '@mui/material/styles';

import { themeColors } from './tailwind-theme';

const MUITheme = createTheme({
  palette: {
    primary: { main: themeColors.primary },
    secondary: { main: themeColors.primary },
  },
  spacing: 8,
});

export default MUITheme;
