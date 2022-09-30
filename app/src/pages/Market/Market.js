import { useState, useMemo, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import WorkspacesIcon from '@mui/icons-material/Workspaces';

import Layout from '../../components/Layout';
import PlayerCard from './components/PlayerCard';
import useAppContext from '../../hooks/useAppContext';

const navigations = [
  { path: '/dashboard', text: 'Dashboard', icon: DashboardIcon },
  { path: '/teams', text: 'Teams', icon: WorkspacesIcon },
];

const PAGE_SIZE = 24;

const Market = () => {
  const {
    playerState: { players },
    accountState: { tokenMintedIds },
  } = useAppContext();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [positions, setPositions] = useState([]);
  const [teams, setTeams] = useState([]);

  const filteredPlayers = useMemo(() => {
    let filtered = players.filter((player) =>
      player.name.toLowerCase().includes(search.trim().toLowerCase())
    );

    if (positions.length) {
      filtered = filtered.filter((player) =>
        positions.includes(player.position)
      );
    }

    if (teams.length) {
      filtered = filtered.filter((player) => teams.includes(player.team.name));
    }
    return filtered;
  }, [players, search, positions, teams]);

  const paginatedPlayers = useMemo(
    () => filteredPlayers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filteredPlayers, page]
  );

  const totalPages = useMemo(
    () => Math.ceil(filteredPlayers.length / PAGE_SIZE),
    [filteredPlayers]
  );

  const pageArray = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );
  const startPart = useMemo(
    () => (pageArray.length > 3 ? pageArray.slice(0, 3) : pageArray),
    [pageArray]
  );
  const endPart = useMemo(() => {
    if (pageArray.length <= 3) return [];
    return pageArray.slice(pageArray.length - 3, pageArray.length);
  }, [pageArray]);

  const hasFilter = useMemo(
    () => positions.length || teams.length,
    [positions, teams]
  );

  useEffect(() => {
    setPage(1);
  }, [search, positions, teams]);

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
          Market
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={8}>
            <Box
              px={2}
              bgcolor="secondary.main"
              borderRadius={2}
              height={50}
              display="flex"
              alignItems="center"
            >
              <input
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                }}
                placeholder="Player name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box
              p={2}
              bgcolor={hasFilter ? 'success.main' : 'secondary.main'}
              borderRadius={2}
              minHeight={50}
              boxSizing="border-box"
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Typography flex={1} fontSize={12} fontWeight={600}>
                Filter
              </Typography>
              {!hasFilter ? (
                <TuneIcon sx={{ fontSize: 14, cursor: 'pointer' }} />
              ) : (
                <HighlightOffIcon sx={{ fontSize: 14, cursor: 'pointer' }} />
              )}
            </Box>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            {startPart.map((item) => (
              <Box
                key={item}
                width={30}
                height={30}
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius={1}
                bgcolor={page === item ? 'black' : 'success.main'}
                sx={{ cursor: 'pointer' }}
                onClick={() => setPage(item)}
              >
                <Typography
                  fontWeight={700}
                  color={page === item ? 'white' : 'black'}
                >
                  {item}
                </Typography>
              </Box>
            ))}
            {totalPages > 6 && (
              <Box>
                <Typography fontWeight={700} color="white">
                  ...
                </Typography>
              </Box>
            )}
            {endPart.map((item) => (
              <Box
                key={item}
                width={30}
                height={30}
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius={1}
                bgcolor={page === item ? 'black' : 'success.main'}
                sx={{ cursor: 'pointer' }}
                onClick={() => setPage(item)}
              >
                <Typography
                  fontWeight={700}
                  color={page === item ? 'white' : 'black'}
                >
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography fontWeight={700} color="success.main">
              Prev
            </Typography>
            <Box color="success.main">
              <input
                style={{ width: 50, height: 30, marginRight: 6 }}
                value={page}
              />
              of {totalPages} pages
            </Box>
            <Typography fontWeight={700} color="success.main">
              Next
            </Typography>
          </Box>
        </Box>
        <Box flex={1} overflow="auto">
          <Grid container spacing={2}>
            {paginatedPlayers.map((player) => (
              <Grid key={player.id} item xs={3}>
                <PlayerCard
                  player={player}
                  isMinted={tokenMintedIds.includes(player.id)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

export default Market;
