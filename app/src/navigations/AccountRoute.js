import { Routes, Route, Navigate } from 'react-router-dom';

import AccountInformation from '../pages/Account/AccountInformation';
import Teams from '../pages/Account/Teams';

const AccountRoute = () => {
  return (
    <Routes>
      <Route path='/information' element={<AccountInformation />} />
      <Route path='/teams' element={<Teams />} />
      <Route path='/*' element={<Navigate to='/information' replace />} />
    </Routes>
  );
};

export default AccountRoute;
