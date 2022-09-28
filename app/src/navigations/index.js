import MainRoute from './MainRoute';
import AuthRoute from './AuthRoute';

import useAppContext from '../hooks/useAppContext';
import { Box } from '@mui/material';

const Navigation = () => {
  const {
    accountState: { account, isAuthenticating },
    firebaseAuthState: { currentUser, isInitialized },
  } = useAppContext();

  if (isAuthenticating || !isInitialized)
    return <Box width='100vw' height='100vh' bgcolor='black' />;

  if (!account || !currentUser) return <AuthRoute />;

  return <MainRoute />;
};

export default Navigation;
