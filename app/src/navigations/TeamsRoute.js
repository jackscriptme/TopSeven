import { Routes, Route, Navigate } from 'react-router-dom';

import Teams from '../pages/Teams/Teams';

const TeamsRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<Teams />} />
      <Route path='/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default TeamsRoute;
