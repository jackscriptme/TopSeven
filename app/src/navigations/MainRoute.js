import { Routes, Route, Navigate } from 'react-router-dom';

import DashboardRoute from './DashboardRoute';
import AnalyticsRoute from './AnalyticsRoute';
import BalanceRoute from './BalanceRoute';
import HistoryRoute from './HistoryRoute';
import LeaguesRoute from './LeaguesRoute';
import LiveRoute from './LiveRoute';
import NewsRoute from './NewsRoute';
import SettingsRoute from './SettingsRoute';
import TeamsRoute from './TeamsRoute';

const routes = [
  { path: '/dashboard/*', element: DashboardRoute },
  { path: '/teams/*', element: TeamsRoute },
  { path: '/live/*', element: LiveRoute },
  { path: '/leagues/*', element: LeaguesRoute },
  { path: '/analytics/*', element: AnalyticsRoute },
  { path: '/balance/*', element: BalanceRoute },
  { path: '/history/*', element: HistoryRoute },
  { path: '/settings/*', element: SettingsRoute },
  { path: '/news/*', element: NewsRoute },
];

const MainRoute = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
      <Route path='/*' element={<Navigate to='/dashboard' replace />} />
    </Routes>
  );
};

export default MainRoute;
