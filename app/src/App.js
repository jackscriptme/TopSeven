import { ThemeProvider, createTheme } from '@mui/material';

import Navigation from './navigations';

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Navigation />
    </ThemeProvider>
  );
};

export default App;
