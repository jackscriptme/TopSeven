import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';

import useMatchPath from '../hooks/useMatchPath';

const Navigation = ({ navigations }) => {
  const navigate = useNavigate();
  const { isMatchPath } = useMatchPath();

  return (
    <Box
      flex={1}
      borderRadius={2}
      bgcolor='primary.light'
      p={2}
      overflow='scroll'
    >
      <Grid container spacing={2}>
        {navigations.map((nav) => (
          <Grid key={nav.path} item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Box
              width={100}
              height={100}
              borderRadius={2}
              display='flex'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              gap={1}
              bgcolor={isMatchPath(nav.path) ? 'success.main' : 'transparent'}
              sx={{
                cursor: 'pointer',
                transition: 'all ease 0.3',
                ...(isMatchPath(nav.path)
                  ? {
                      boxShadow: '0px 0px 10px 0px rgba(255,218,9,1)',
                      WebkitBoxShadow: '0px 0px 10px 0px rgba(255,218,9,1)',
                      MozBoxShadow: '0px 0px 10px 0px rgba(255,218,9,1)',
                    }
                  : { '&:hover': { backgroundColor: 'primary.main' } }),
              }}
              onClick={() => navigate(nav.path)}
            >
              <nav.icon
                sx={{
                  color: isMatchPath(nav.path) ? 'black' : 'secondary.main',
                }}
              />
              <Typography
                fontSize={10}
                fontWeight={500}
                align='center'
                color={isMatchPath(nav.path) ? 'black' : 'secondary.main'}
                textTransform='uppercase'
              >
                {nav.text}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Navigation;
