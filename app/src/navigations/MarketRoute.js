import { Routes, Route, Navigate } from 'react-router-dom';

import Market from '../pages/Market/Market';

const MarketRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<Market />} />
      <Route path='/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default MarketRoute;
