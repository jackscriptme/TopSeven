import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const useMatchPath = () => {
  const { pathname } = useLocation();
  const isMatchPathInclude = useCallback(
    (path) => pathname.includes(path),
    [pathname]
  );

  const isMatchPath = useCallback((path) => pathname === path, [pathname]);

  return { isMatchPath, isMatchPathInclude };
};

export default useMatchPath;
