import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import PeopleIcon from '@mui/icons-material/People';
import TuneIcon from '@mui/icons-material/Tune';
import CancelIcon from '@mui/icons-material/Cancel';

import Layout from '../../components/Layout';
import PlayerItem from './components/PlayerItem';
import FormationModal from './components/FormationModal';
import useAppContext from '../../hooks/useAppContext';

const navigations = [
  { path: '/dashboard', text: 'Dashboard', icon: DashboardIcon },
  { path: '/teams', text: 'Teams', icon: WorkspacesIcon },
  { path: '/teams/players', text: 'Teams', icon: PeopleIcon },
];

const TeamDetail = () => {
  const { id } = useParams();
  const {
    playerState: { userPlayers },
    teamState: { teams },
    systemState: { systems },
    formationState: { formations },
  } = useAppContext();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const positions = useMemo(() => systems.positions || {}, [systems]);
  const [activeFormationId, setActiveFormationId] = useState(null);
  const [teamPlayers, setTeamPlayers] = useState([]);

  const team = useMemo(() => teams.find((item) => item.id === id), [teams, id]);
  const freePlayers = useMemo(() => {
    const teamPlayerIds = teams.reduce(
      (playerIds, team) => [
        ...playerIds,
        ...team.playerIds,
        ...team.subPlayerIds,
      ],
      []
    );
    const currentTeamPlayerIds = teamPlayers.map((item) => item.id);
    return userPlayers.filter(
      (player) =>
        !teamPlayerIds.includes(player.id) &&
        !currentTeamPlayerIds.includes(player.id)
    );
  }, [teams, userPlayers, teamPlayers]);

  const formation = useMemo(
    () => formations.find((item) => item.id === activeFormationId),
    [formations, activeFormationId]
  );

  useEffect(() => {
    if (!activeFormationId && formations[0]) {
      setActiveFormationId(formations[0]?.id);
    }
  }, [formations]);

  const positionCoordinate = useMemo(() => {
    if (!formation || !formation.positions) return null;

    const result = formation.positions.map((position) => {
      const coordinate = positions[position.slice(0, 2)];

      let top = coordinate.top;
      let left = coordinate.left;

      if (position.includes('1')) {
        left -= 15;
      }

      if (position.includes('2')) {
        left += 15;
      }

      return { position, top, left };
    });

    return result;
  }, [positions, formation]);

  const updatePlayerPosition = useCallback(
    (playerId, position) => {
      if (!playerId) return;
      const isInclude = teamPlayers.some(
        (player) => player.position === position
      );
      if (isInclude) {
        setTeamPlayers(
          teamPlayers.map((player) => {
            if (player.id !== playerId) return player;

            return { ...player, id: playerId };
          })
        );

        return;
      }

      setTeamPlayers([...teamPlayers, { id: playerId, position }]);
    },
    [teamPlayers]
  );

  const getPlayer = useCallback(
    (position) => {
      const playerId = teamPlayers.find(
        (item) => item.position === position
      )?.id;
      const player = userPlayers.find((item) => item.id === playerId);
      return player;
    },
    [teamPlayers, userPlayers]
  );

  const removePosition = useCallback(
    (position) => {
      setTeamPlayers(teamPlayers.filter((item) => item.position !== position));
    },
    [teamPlayers]
  );

  return (
    <Layout navigations={navigations}>
      <FormationModal
        isOpen={isOpenModal}
        close={() => setIsOpenModal(false)}
        formations={formations}
        activeFormationId={activeFormationId}
        onClick={(newFormationId) => {
          setActiveFormationId(newFormationId);
          setIsOpenModal(false);
        }}
      />
      <Box
        flex={1}
        borderRadius={2}
        bgcolor="primary.light"
        p={2}
        display="flex"
        flexDirection="column"
        gap={2}
        maxHeight="100%"
      >
        <Typography fontSize={14} color="white" textTransform="uppercase">
          {team ? team.name : 'Create team'}
        </Typography>
        <Box
          maxHeight="100%"
          flex={1}
          display="flex"
          gap={2}
          alignItems="flex-start"
        >
          <Box p={2} borderRadius={2} bgcolor="success.main" display="flex">
            <Box position="relative">
              <img
                src="/images/pitch.jpg"
                style={{ borderRadius: 20, maxHeight: 480, maxWidth: 320 }}
              />
              {positionCoordinate &&
                positionCoordinate.map(({ position, top, left }, index) => (
                  <Box
                    key={`${position}-${index}`}
                    position="absolute"
                    top={`${top}%`}
                    left={`${left}%`}
                    width={20}
                    height={20}
                    borderRadius="50%"
                    bgcolor="success.main"
                    sx={{ transform: 'translate(-50%)' }}
                  >
                    {getPlayer(position) && (
                      <Typography
                        color="success.main"
                        align="center"
                        textTransform="uppercase"
                        sx={{
                          position: 'absolute',
                          top: '100%',
                          left: '-50%',
                          transform: 'translateX(-10px)',
                          bgcolor: 'black',
                        }}
                      >
                        {
                          getPlayer(position).name.split(' ')[
                            getPlayer(position).name.split(' ').length - 1
                          ]
                        }
                      </Typography>
                    )}
                  </Box>
                ))}
            </Box>
          </Box>
          <Box
            flex={1}
            p={2}
            borderRadius={2}
            bgcolor="success.main"
            display="flex"
            gap={1}
            flexDirection="column"
          >
            <Box
              py={1}
              px={2}
              borderRadius={2}
              bgcolor="primary.main"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography fontWeight={700} color="success.main">
                {formation?.name}
              </Typography>
              <TuneIcon
                sx={{ color: 'success.main', cursor: 'pointer' }}
                onClick={() => setIsOpenModal(true)}
              />
            </Box>
            {formation?.positions.map((position, index) => {
              const player = getPlayer(position);
              return (
                <Box
                  key={`${formation.id}-${position}-${index}`}
                  py={1}
                  px={2}
                  borderRadius={2}
                  bgcolor="primary.main"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  droppable
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) =>
                    updatePlayerPosition(
                      e.dataTransfer.getData('playerId'),
                      position
                    )
                  }
                >
                  <Typography fontWeight={700} color="success.main">
                    {position.slice(0, 2)}
                  </Typography>
                  {player && (
                    <Typography fontWeight={700} color="success.main">
                      {player.name}
                    </Typography>
                  )}
                  {player && (
                    <CancelIcon
                      color="success"
                      sx={{ cursor: 'pointer' }}
                      onClick={() => removePosition(position)}
                    />
                  )}
                </Box>
              );
            })}
          </Box>
          <Box
            flex={1}
            p={2}
            borderRadius={2}
            bgcolor="success.main"
            display="flex"
            flexDirection="column"
            gap={2}
            height="calc(100% - 80px)"
          >
            <Typography>Your free players</Typography>
            <Box
              flex={1}
              display="flex"
              flexDirection="column"
              gap={1}
              overflow="auto"
              height="100%"
            >
              {freePlayers.map((player) => (
                <PlayerItem key={player.id} player={player} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default TeamDetail;
