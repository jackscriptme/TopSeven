import { Box, Typography, Button } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import useAppContext from '../hooks/useAppContext';

const Header = () => {
  const {
    accountState: { account, logout },
  } = useAppContext();

  return (
    <Box
      px={2}
      height={70}
      bgcolor='primary.main'
      display='flex'
      alignItems='center'
      justifyContent='space-between'
    >
      <Typography
        fontSize={30}
        fontWeight={700}
        fontFamily="'Bowlby One SC', cursive"
        sx={{
          background:
            'linear-gradient(90deg, rgba(242,160,0,1) 0%, rgba(255,247,41,1) 50%, rgba(255,117,0,1) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        TopSeven
      </Typography>
      {account && (
        <Button
          sx={{
            backgroundColor: 'primary.light',
            color: 'secondary.main',
            '&:hover': { backgroundColor: 'primary.dark' },
          }}
          onClick={logout}
        >
          <ExitToAppIcon sx={{ mr: 1 }} />
          <Typography fontSize={12} fontWeight={700} color='inherit'>
            Logout
          </Typography>
        </Button>
      )}
    </Box>
  );
};

export default Header;
