import { Routes, Route, Navigate } from 'react-router-dom';

import News from '../pages/News/News';

const NewsRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<News />} />
      <Route path='/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default NewsRoute;
