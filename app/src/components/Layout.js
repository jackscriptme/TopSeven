import { Box } from '@mui/material';

import Header from './Header';
import UserAvatar from './UserAvatar';
import Sidebar from './Sidebar';
import Navigation from './Navigation';

const Layout = ({ children, navigations }) => {
  return (
    <Box height='100vh' width='100vw' display='flex' bgcolor='primary.lighter'>
      <Sidebar />
      <Box flex={1} height='100vh' display='flex' flexDirection='column'>
        <Header />
        <Box
          flex={1}
          height='calc(100vh - 70px)'
          boxSizing='border-box'
          display='flex'
          gap={2}
          p={2}
        >
          <Box
            width={250}
            maxHeight='100%'
            display='flex'
            gap={2}
            flexDirection='column'
          >
            <UserAvatar />
            {navigations && <Navigation navigations={navigations} />}
          </Box>
          <Box flex={1} display='flex'>
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
