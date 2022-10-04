import { Box, CircularProgress, Typography, alpha } from '@mui/material';

const Loading = ({ isLoading, text }) => {
  if (!isLoading) return null;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      bgcolor={alpha('#000', 0.6)}
      zIndex={20}
      display="flex"
      gap={2}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress color="success" />
      {text && (
        <Typography fontWeight={700} color="success.main">
          {text}
        </Typography>
      )}
    </Box>
  );
};

export default Loading;
