import { Box } from '@mui/material';

import Header from './Header';
import UserAvatar from './UserAvatar';
import Sidebar from './Sidebar';
import Navigation from './Navigation';

const Layout = ({ children }) => {
  return (
    <Box height='100vh' width='100vw' display='flex' bgcolor='secondary.main'>
      <Sidebar />
      <Box flex={1} display='flex' flexDirection='column'>
        <Header />
        <Box flex={1} display='flex' gap={2} p={2}>
          <Box width={250} display='flex' gap={2} flexDirection='column'>
            <UserAvatar />
            <Navigation />
          </Box>
          <Box flex={1}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
