import { Routes, Route, Navigate } from 'react-router-dom';

import Teams from '../pages/Teams/Teams';
import TeamDetail from '../pages/Teams/TeamDetail';
import Players from '../pages/Teams/Players';

const TeamsRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Teams />} />
      <Route path="/:id" element={<TeamDetail />} />
      <Route path="/create" element={<TeamDetail />} />
      <Route path="/players" element={<Players />} />
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default TeamsRoute;
