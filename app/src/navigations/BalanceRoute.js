import { Routes, Route, Navigate } from 'react-router-dom';

import Balance from '../pages/Balance/Balance';

const BalanceRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<Balance />} />
      <Route path='/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default BalanceRoute;
