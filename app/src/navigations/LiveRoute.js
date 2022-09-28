import { Routes, Route, Navigate } from 'react-router-dom';

import Live from '../pages/Live/Live';

const LiveRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<Live />} />
      <Route path='/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default LiveRoute;
