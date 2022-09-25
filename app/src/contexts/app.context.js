import { createContext } from 'react';

import useAccount from '../hooks/useAccount';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const accountState = useAccount();

  return (
    <AppContext.Provider
      value={{
        ...accountState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
