import { Routes, Route, Navigate } from 'react-router-dom';

import Leagues from '../pages/Leagues/Leagues';

const LeaguesRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<Leagues />} />
      <Route path='/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default LeaguesRoute;
