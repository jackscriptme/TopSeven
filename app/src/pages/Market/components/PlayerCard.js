import { Box, Button, Grid, Typography } from '@mui/material';

const PlayerCard = ({ player }) => {
  const { name, image, position, stats, team, notMintedIds } = player;
  const remaining = notMintedIds.length;

  return (
    <Box
      p={2}
      borderRadius={2}
      bgcolor="primary.dark"
      display="flex"
      flexDirection="column"
      gap={1}
    >
      <Box>
        <Typography align="center" fontWeight={700} color="success.main">
          {position}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        <Box>
          <Typography fontWeight={700} color="success.main">
            {stats.overall}
          </Typography>
        </Box>
        <Box flex={1} display="flex" justifyContent="center">
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/nft-mistery-box-4731026-3934285.png"
            width="100%"
            style={{ borderRadius: 8 }}
          />
        </Box>
        <Box>
          <img src={team.image} width={25} />
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
        <Typography
          align="center"
          fontWeight={700}
          fontSize={14}
          color="success.main"
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {name}
        </Typography>
        <Typography
          align="center"
          fontWeight={700}
          fontSize={11}
          color="success.main"
          textTransform="uppercase"
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {remaining} left
        </Typography>
      </Box>
      <Box>
        <Grid container spacing={0.5}>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box>
              {['sho', 'dri', 'pac'].map((key) => (
                <Box display="flex" gap={1}>
                  <Typography
                    fontSize={12}
                    fontWeight={700}
                    color="success.main"
                  >
                    {stats[key]}
                  </Typography>
                  <Typography
                    fontSize={12}
                    fontWeight={500}
                    color="success.main"
                  >
                    {key.toUpperCase()}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box>
              {['def', 'pas', 'phy'].map((key) => (
                <Box display="flex" gap={1}>
                  <Typography
                    fontSize={12}
                    fontWeight={700}
                    color="success.main"
                  >
                    {stats[key]}
                  </Typography>
                  <Typography
                    fontSize={12}
                    fontWeight={500}
                    color="success.main"
                  >
                    {key.toUpperCase()}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Button
          size="small"
          disabled={!remaining}
          sx={{
            textTransform: 'uppercase',
            fontSize: 12,
            fontWeight: 700,
            width: '100%',
            backgroundColor: 'primary.light',
            color: 'success.main',
            borderRadius: 2,
            '&:hover': {
              backgroundColor: 'primary.main',
              color: 'success.main',
            },
          }}
        >
          {!remaining ? 'Sold out' : `Buy with ${player.price / 1e18} MATIC`}
        </Button>
      </Box>
    </Box>
  );
};

export default PlayerCard;
