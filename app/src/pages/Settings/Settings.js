import { useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Layout from '../../components/Layout';
import navigations from './utils/navigations';
import useAppContext from '../../hooks/useAppContext';

const validationSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required('Username is required')
    .min(4, 'Username must have 4-16 characters')
    .max(16, 'Username must have 4-16 characters'),
});

const Settings = () => {
  const {
    firebaseAuthState: { profile },
  } = useAppContext();

  const initialValues = {
    username: profile?.username || '',
  };

  const onSubmit = useCallback(async (values) => {
    console.log({ values });
  }, []);

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Layout navigations={navigations}>
      <Box
        flex={1}
        borderRadius={2}
        bgcolor='primary.light'
        p={2}
        display='flex'
        flexDirection='column'
        gap={2}
      >
        <Typography fontSize={14} color='white' textTransform='uppercase'>
          Account settings
        </Typography>
        <Box></Box>
      </Box>
    </Layout>
  );
};

export default Settings;
