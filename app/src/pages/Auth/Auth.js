import { Box, Typography } from '@mui/material';
import { yellow, brown, grey } from '@mui/material/colors';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

import useAppContext from '../../hooks/useAppContext';

const Home = () => {
  const {
    accountState: {
      isAuthenticating,
      isInitialized,
      account,
      connectMetamaskWallet,
    },
  } = useAppContext();

  const authButtons = [
    { id: 0, text: 'Connect Metamask wallet', onClick: connectMetamaskWallet },
  ];

  return (
    <Box
      height='100vh'
      width='100vw'
      position='relative'
      sx={{
        backgroundImage: "url('/images/home.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        position='absolute'
        top={0}
        left={0}
        height='100%'
        width='100%'
        boxSizing='border-box'
        bgcolor='rgba(0, 0, 0, 0.5)'
      />

      {isInitialized && (
        <Box
          p={8}
          position='absolute'
          top={0}
          left={0}
          height='100%'
          width='100%'
          boxSizing='border-box'
          display='flex'
          gap={1}
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          <Typography
            fontSize={100}
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
          {!account ? (
            authButtons.map((button) => (
              <Box
                key={button.text}
                role='button'
                display='flex'
                gap={1}
                alignItems='center'
                justifyContent='center'
                sx={
                  !isAuthenticating
                    ? {
                        '&:hover': { '& > svg': { opacity: 1 } },
                      }
                    : {}
                }
                onClick={button.onClick}
              >
                <ArrowRightIcon
                  sx={{
                    fontSize: 48,
                    color: yellow[400],
                    opacity: 0,
                    transition: 'all ease 0.3s',
                  }}
                />
                <Box
                  p={0.75}
                  borderRadius={10}
                  bgcolor={brown[300]}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      '& > div': {
                        backgroundColor: grey[900],
                      },
                    },
                  }}
                >
                  <Box
                    p={1}
                    width={400}
                    borderRadius={10}
                    border={`4px solid ${yellow[400]}`}
                    bgcolor={brown[800]}
                    sx={{ transition: 'all ease 0.3s' }}
                  >
                    <Typography
                      color='white'
                      align='center'
                      fontSize={20}
                      fontWeight={700}
                    >
                      {button.text}
                    </Typography>
                  </Box>
                </Box>
                <ArrowLeftIcon
                  sx={{
                    fontSize: 48,
                    color: yellow[400],
                    opacity: 0,
                    transition: 'all ease 0.3s',
                  }}
                />
              </Box>
            ))
          ) : (
            <Box>
              <Typography fontSize={24} fontWeight={700} color='white'>
                Loading user credential...
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Home;
