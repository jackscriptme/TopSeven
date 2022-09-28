import { Routes, Route, Navigate } from 'react-router-dom';

import Settings from '../pages/Settings/Settings';

const SettingsRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<Settings />} />
      <Route path='/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default SettingsRoute;
