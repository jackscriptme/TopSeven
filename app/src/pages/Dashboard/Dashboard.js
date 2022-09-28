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

import Layout from '../../components/Layout';

const navigations = [
  { path: '/dashboard', text: 'Dashboard', icon: DashboardIcon },
  { path: '/teams', text: 'Teams', icon: WorkspacesIcon },
  { path: '/live', text: 'Live', icon: YouTubeIcon },
  { path: '/leagues', text: 'Leagues', icon: EmojiEventsIcon },
  { path: '/analytics', text: 'Analytics', icon: AnalyticsIcon },
  { path: '/balance', text: 'Balance', icon: AccountBalanceWalletIcon },
  { path: '/history', text: 'History', icon: HistoryIcon },
  { path: '/settings', text: 'Settings', icon: SettingsIcon },
  { path: '/news', text: 'News', icon: FeedIcon },
  { path: '/market', text: 'Market', icon: LocalGroceryStoreIcon },
];

const Dashboard = () => {
  return (
    <Layout navigations={navigations}>
      <Box>Dashboard</Box>
    </Layout>
  );
};

export default Dashboard;
