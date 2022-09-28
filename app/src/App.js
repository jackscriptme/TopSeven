import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import Navigation from './navigations';
import { AppContextProvider } from './contexts/app.context';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3b3c3d',
      light: '#494d4d',
      dark: '#272829',
      lighter: '#888',
    },
    secondary: {
      main: '#999',
    },
    success: {
      main: '#ffda09',
    },
  },
});

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
