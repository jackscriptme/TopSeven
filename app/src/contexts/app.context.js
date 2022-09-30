import { createContext } from 'react';

import useAccount from '../hooks/useAccount';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import usePlayers from '../hooks/usePlayers';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const accountState = useAccount();
  const firebaseAuthState = useFirebaseAuth(accountState.account);
  const playerState = usePlayers();

  return (
    <AppContext.Provider
      value={{
        accountState,
        firebaseAuthState,
        playerState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
