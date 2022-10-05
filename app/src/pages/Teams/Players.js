import { Box, Grid, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkspacesIcon from '@mui/icons-material/Workspaces';

import Layout from '../../components/Layout';
import PlayerCard from '../Market/components/PlayerCard';
import useAppContext from '../../hooks/useAppContext';

const navigations = [
  { path: '/dashboard', text: 'Dashboard', icon: DashboardIcon },
  { path: '/teams', text: 'Teams', icon: WorkspacesIcon },
];

const Players = () => {
  const {
    playerState: { userPlayers },
  } = useAppContext();

  return (
    <Layout navigations={navigations}>
      <Box
        flex={1}
        borderRadius={2}
        bgcolor="primary.light"
        p={2}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <Typography fontSize={14} color="white" textTransform="uppercase">
          Players
        </Typography>
        <Box flex={1} overflow="auto">
          <Grid container spacing={2}>
            {userPlayers.map((player) => (
              <Grid key={player.id} item xs={3}>
                <PlayerCard player={player} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

export default Players;
