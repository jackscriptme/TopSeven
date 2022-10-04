import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import _ from 'lodash';
import { Box, Button, Grid, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';

import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import PlayerCard from './components/PlayerCard';
import useAppContext from '../../hooks/useAppContext';

const navigations = [
  { path: '/dashboard', text: 'Dashboard', icon: DashboardIcon },
  { path: '/market', text: 'Market', icon: LocalGroceryStoreIcon },
  { path: '/teams', text: 'Teams', icon: WorkspacesIcon },
];

const Player = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  const {
    playerState: { players },
    accountState: { tokenMintedIds, mintNFT, isMinting },
  } = useAppContext();

  const playerList = useMemo(
    () => players.filter((player) => player.name === name),
    [players, name]
  );

  return (
    <Layout navigations={navigations}>
      <Loading isLoading={isMinting} text="Your transaction is processing..." />
      <Box
        flex={1}
        borderRadius={2}
        bgcolor="primary.light"
        p={2}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <Typography
          fontWeight={700}
          fontSize={14}
          color="white"
          textTransform="uppercase"
        >
          {name}
        </Typography>
        <Box flex={1} overflow="auto">
          <Grid container spacing={2}>
            {playerList.map((player) => (
              <Grid key={player.id} item xs={3}>
                <PlayerCard
                  player={player}
                  tokenMintedIds={tokenMintedIds}
                  mintNFT={mintNFT}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

export default Player;
