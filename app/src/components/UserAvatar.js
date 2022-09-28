import { Box, Typography, useTheme } from '@mui/material';
import { QRCode } from 'react-qrcode-logo';

import useAppContext from '../hooks/useAppContext';

const UserAvatar = () => {
  const theme = useTheme();
  const {
    accountState: { account },
    firebaseAuthState: { profile },
  } = useAppContext();

  return (
    <Box
      height={100}
      bgcolor='primary.light'
      borderRadius={2}
      p={2}
      display='flex'
      alignItems='center'
      gap={2}
      overflow='hidden'
    >
      <Box
        width={90}
        height={90}
        borderRadius='50%'
        overflow='hidden'
        sx={{ flexShrink: 0 }}
      >
        <QRCode
          value={account}
          fgColor={theme.palette.success.main}
          bgColor={theme.palette.primary.main}
        />
      </Box>
      <Box sx={{ flexShrink: 1 }}>
        <Typography fontSize={20} fontWeight={700} color='white'>
          {profile?.username}
        </Typography>
        <Typography fontSize={12} color='white'>
          Level {profile?.level}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserAvatar;
