import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';

const PlayerCard = ({ player, tokenMintedIds, mintNFT }) => {
  const navigate = useNavigate();
  const { id, name, image, position, price, stats, team } = player;

  const isDetail = useMemo(() => !!mintNFT, [mintNFT]);
  const soldOut = useMemo(
    () => (tokenMintedIds || []).includes(id),
    [id, tokenMintedIds]
  );

  const view = useCallback(() => {
    navigate(`/market/players?name=${name}`);
  }, [name]);

  const mint = useCallback(() => {
    mintNFT(id, price);
  }, [id, price, mintNFT]);

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
      </Box>
      <Box>
        <Grid container spacing={0.5}>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box>
              {['sho', 'dri', 'pac'].map((key) => (
                <Box key={key} display="flex" gap={1}>
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
                <Box key={key} display="flex" gap={1}>
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
          disabled={soldOut}
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
          onClick={isDetail ? mint : view}
        >
          {isDetail
            ? soldOut
              ? 'Sold out'
              : `Buy with ${price / 1e18} MATIC`
            : 'View'}
        </Button>
      </Box>
    </Box>
  );
};

export default PlayerCard;
