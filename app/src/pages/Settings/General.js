import { Box } from '@mui/material';

import Layout from '../../components/Layout';
import navigations from './utils/navigations';

const General = () => {
  return (
    <Layout navigations={navigations}>
      <Box>General</Box>
    </Layout>
  );
};

export default General;
