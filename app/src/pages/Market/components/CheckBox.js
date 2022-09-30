import { Box, Typography, useTheme } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const CheckBox = ({ checked, label, onClick }) => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      gap={2}
      alignItems="center"
      sx={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <Box
        width={15}
        height={15}
        borderRadius={1}
        border={`1px solid ${theme.palette.success.main}`}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor={checked ? 'success.main' : 'transparent'}
      >
        {checked && <CheckIcon sx={{ fontSize: 10, color: 'black' }} />}
      </Box>
      <Typography fontSize={12} color="success.main">
        {label}
      </Typography>
    </Box>
  );
};

export default CheckBox;
