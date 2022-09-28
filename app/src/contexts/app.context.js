import { createContext } from 'react';

import useAccount from '../hooks/useAccount';
import useFirebaseAuth from '../hooks/useFirebaseAuth';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const accountState = useAccount();
  const firebaseAuthState = useFirebaseAuth(accountState.account);

  return (
    <AppContext.Provider
      value={{
        accountState,
        firebaseAuthState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
