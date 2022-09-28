import { Routes, Route, Navigate } from 'react-router-dom';

import Analytics from '../pages/Analytics/Analytics';

const AnalyticsRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<Analytics />} />
      <Route path='/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default AnalyticsRoute;
