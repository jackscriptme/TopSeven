import { Box, Button, Grid, Typography } from '@mui/material';

const PlayerCard = ({ player, isMinted }) => {
  const { name, image, position, stats, team } = player;

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
            src="https://assets.manutd.com/AssetPicker/images/0/0/16/247/1111858/Player_Profile_Thumbnail_Mens_2223_Kit_DDG1658217260527.jpg"
            width="100%"
            style={{ borderRadius: 8 }}
          />
        </Box>
        <Box>
          <img src={team.image} width={25} />
        </Box>
      </Box>
      <Box>
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
          disabled={isMinted}
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
          {isMinted ? 'Sold' : 'Buy'}
        </Button>
      </Box>
    </Box>
  );
};

export default PlayerCard;
