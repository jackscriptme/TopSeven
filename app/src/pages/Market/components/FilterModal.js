import { useCallback } from 'react';
import { Box, Grid, alpha, Typography } from '@mui/material';

import CheckBox from './CheckBox';

const allTeams = [
  'Borussia Dortmund',
  'FC Bayern München',
  'Arsenal FC',
  'Chelsea FC',
  'Liverpool FC',
  'Manchester City FC',
  'Manchester United FC',
  'Tottenham Hotspur FC',
  'Club Atlético de Madrid',
  'FC Barcelona',
  'Real Madrid CF',
  'AC Milan',
  'AS Roma',
  'FC Internazionale Milano',
  'Cagliari Calcio',
  'Juventus FC',
  'Leicester City FC',
  'Paris Saint-Germain FC',
  'AS Monaco FC',
  'West Ham United FC',
  'Burnley FC',
  'PSV',
  'Fulham FC',
  'AFC Ajax',
  'Torino FC',
];

const allPositions = [
  'GK',
  'LB',
  'CB',
  'RB',
  'DM',
  'CM',
  'AM',
  'LM',
  'RM',
  'LW',
  'RW',
  'CF',
];

const FilterModal = ({
  isOpen,
  close,
  positions,
  teams,
  setTeams,
  setPositions,
}) => {
  const toggleTeams = useCallback(
    (team) => {
      if (teams.includes(team)) {
        setTeams(teams.filter((item) => item !== team));
        return;
      }

      setTeams([...teams, team]);
    },
    [teams]
  );

  const togglePositions = useCallback(
    (position) => {
      if (positions.includes(position)) {
        setPositions(positions.filter((item) => item !== position));
        return;
      }

      setPositions([...positions, position]);
    },
    [positions]
  );

  const toggleSelectAllTeams = useCallback(
    () => setTeams(allTeams.length === teams.length ? [] : allTeams),
    [teams]
  );
  const toggleSelectAllPositions = useCallback(
    () =>
      setPositions(
        allPositions.length === positions.length ? [] : allPositions
      ),
    [positions]
  );

  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      bgcolor={alpha('#000', 0.4)}
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={20}
      onClick={close}
    >
      <Box
        width={800}
        bgcolor="primary.dark"
        borderRadius={2}
        p={3}
        onClick={(e) => e.stopPropagation()}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={2}>
              <CheckBox
                label=""
                checked={teams.length === allTeams.length}
                onClick={toggleSelectAllTeams}
              />
              <Typography
                fontSize={14}
                color="success.main"
                sx={{ textTransform: 'uppercase' }}
              >
                Teams
              </Typography>
            </Box>
          </Grid>
          {allTeams.map((team) => (
            <Grid key={team} item xs={3}>
              <CheckBox
                label={team}
                checked={teams.includes(team)}
                onClick={() => toggleTeams(team)}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={1} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={2}>
              <CheckBox
                label=""
                checked={positions.length === allPositions.length}
                onClick={toggleSelectAllPositions}
              />
              <Typography
                fontSize={14}
                color="success.main"
                sx={{ textTransform: 'uppercase' }}
              >
                Positions
              </Typography>
            </Box>
          </Grid>
          {allPositions.map((position) => (
            <Grid key={position} item xs={3}>
              <CheckBox
                label={position}
                checked={positions.includes(position)}
                onClick={() => togglePositions(position)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default FilterModal;
