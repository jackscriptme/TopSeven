import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import Navigation from './navigations';
import { AppContextProvider } from './contexts/app.context';

const theme = createTheme();

const App = () => {
  return (
    <AppContextProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </ThemeProvider>
    </AppContextProvider>
  );
};

export default App;
