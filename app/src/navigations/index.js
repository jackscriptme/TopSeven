import { Routes, Route } from 'react-router-dom';

import AccountRoute from './AccountRoute';
import SettingRoute from './SettingRoute';
import HomeRoute from './HomeRoute';

const Navigation = () => {
  return (
    <Routes>
      <Route path='/account/*' element={<AccountRoute />} />
      <Route path='/setting/*' element={<SettingRoute />} />
      <Route path='/*' element={<HomeRoute />} />
    </Routes>
  );
};

export default Navigation;
