import { Box, Typography } from '@mui/material';

const PlayerItem = ({ player }) => {
  return (
    <Box
      py={1}
      px={2}
      borderRadius={2}
      bgcolor="primary.main"
      draggable
      onDragStart={(e) => e.dataTransfer.setData('playerId', player.id)}
    >
      <Typography color="success.main" fontWeight={600}>
        {player.name}
      </Typography>
    </Box>
  );
};

export default PlayerItem;
