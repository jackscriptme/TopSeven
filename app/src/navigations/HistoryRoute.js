import { Routes, Route, Navigate } from 'react-router-dom';

import History from '../pages/History/History';

const HistoryRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<History />} />
      <Route path='/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default HistoryRoute;
