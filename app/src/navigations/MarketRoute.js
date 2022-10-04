import { Routes, Route, Navigate } from 'react-router-dom';

import Market from '../pages/Market/Market';
import Player from '../pages/Market/Player';

const MarketRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Market />} />
      <Route path="/players" element={<Player />} />
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default MarketRoute;
