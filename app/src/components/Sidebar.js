import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import FeedIcon from '@mui/icons-material/Feed';

const items = [
  { name: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
  { name: 'Teams', path: '/teams', icon: WorkspacesIcon },
  { name: 'Live matches', path: '/live', icon: YouTubeIcon },
  { name: 'Leagues', path: '/leagues', icon: EmojiEventsIcon },
  { name: 'Analytics', path: '/analytics', icon: AnalyticsIcon },
  { name: 'Balance', path: '/balance', icon: AccountBalanceWalletIcon },
  { name: 'History', path: '/history', icon: HistoryIcon },
  { name: 'Settings', path: '/settings', icon: SettingsIcon },
  { name: 'News', path: '/news', icon: FeedIcon },
  { name: 'Market', path: '/market', icon: LocalGroceryStoreIcon },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = useCallback((path) => path === pathname, [pathname]);

  return (
    <Box
      py={2}
      boxSizing='border-box'
      width={70}
      height='100vh'
      bgcolor='primary.dark'
      display='flex'
      gap={2}
      flexDirection='column'
      alignItems='center'
      overflow='auto'
      title=''
    >
      {items.map((item) => (
        <Box
          key={item.path}
          width={50}
          height={50}
          display='flex'
          alignItems='center'
          justifyContent='center'
          borderRadius={4}
          bgcolor={isActive(item.path) ? 'success.main' : 'transparent'}
          sx={{
            cursor: 'pointer',
            ...(isActive(item.path)
              ? {
                  boxShadow: '0px 0px 10px 0px rgba(255,218,9,1)',
                  WebkitBoxShadow: '0px 0px 10px 0px rgba(255,218,9,1)',
                  MozBoxShadow: '0px 0px 10px 0px rgba(255,218,9,1)',
                }
              : {}),
          }}
          color={isActive(item.path) ? 'black' : 'secondary.main'}
          onClick={() => !isActive(item.path) && navigate(item.path)}
        >
          <item.icon />
        </Box>
      ))}
    </Box>
  );
};

export default Sidebar;
