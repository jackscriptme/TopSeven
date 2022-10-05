import { Box, Typography, alpha } from '@mui/material';

const FormationModal = ({
  isOpen,
  close,
  activeFormationId,
  formations,
  onClick,
}) => {
  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      bgcolor={alpha('#000', 0.6)}
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={30}
      onClick={close}
    >
      <Box
        p={2}
        borderRadius={2}
        maxHeight="80vh"
        width={300}
        bgcolor="primary.main"
        display="flex"
        flexDirection="column"
        gap={2}
        overflow="auto"
        onClick={(e) => e.stopPropagation()}
      >
        {formations.map((formation) => (
          <Box
            key={formation.id}
            py={1}
            px={2}
            borderRadius={2}
            bgcolor={
              activeFormationId === formation.id
                ? 'success.main'
                : 'primary.dark'
            }
            sx={{ cursor: 'pointer' }}
            onClick={() => onClick(formation.id)}
          >
            <Typography
              fontWeight={600}
              color={
                activeFormationId === formation.id
                  ? 'primary.dark'
                  : 'success.main'
              }
            >
              {formation.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FormationModal;
