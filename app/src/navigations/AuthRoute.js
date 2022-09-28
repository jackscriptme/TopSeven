import { Routes, Route, Navigate } from 'react-router-dom';

import Auth from '../pages/Auth/Auth';

const AuthRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<Auth />} />
      <Route path='/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default AuthRoute;
