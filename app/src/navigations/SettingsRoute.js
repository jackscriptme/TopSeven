import { Routes, Route, Navigate } from 'react-router-dom';

import Settings from '../pages/Settings/Settings';
import General from '../pages/Settings/General';
import Security from '../pages/Settings/Security';

const SettingsRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<Settings />} />
      <Route path='/general' element={<General />} />
      <Route path='/security' element={<Security />} />
      <Route path='/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default SettingsRoute;
