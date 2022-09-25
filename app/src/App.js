import { ThemeProvider, createTheme } from '@mui/material';

import Navigation from './navigations';
import { AppContextProvider } from './contexts/app.context';

const theme = createTheme();

const App = () => {
  return (
    <AppContextProvider>
      <ThemeProvider theme={theme}>
        <Navigation />
      </ThemeProvider>
    </AppContextProvider>
  );
};

export default App;
