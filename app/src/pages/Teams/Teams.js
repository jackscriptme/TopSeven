import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';

import Layout from '../../components/Layout';
import TeamCard from './components/TeamCard';
import useAppContext from '../../hooks/useAppContext';

const navigations = [
  { path: '/dashboard', text: 'Dashboard', icon: DashboardIcon },
  { path: '/teams/players', text: 'Players', icon: PeopleIcon },
];

const Teams = () => {
  const navigate = useNavigate();
  const {
    teamState: { teams },
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
          Teams
        </Typography>
        <Button
          size="small"
          variant="contained"
          color="success"
          sx={{
            alignSelf: 'flex-start',
            color: '#000',
            fontWeight: 700,
            fontSize: 10,
          }}
          onClick={() => navigate('/teams/create')}
        >
          <AddIcon size="small" />
          Create team
        </Button>
        <Box
          flex={1}
          overflow="auto"
          display="flex"
          gap={2}
          flexDirection="column"
        >
          {teams.length ? (
            teams.map((team) => <TeamCard key={team.id} team={team} />)
          ) : (
            <Typography color="white" align="center">
              You dont have any team. <br />
              Create one and join the leagues!
            </Typography>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default Teams;
