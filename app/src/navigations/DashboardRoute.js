import { Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from '../pages/Dashboard/Dashboard';

const DashboardRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default DashboardRoute;
