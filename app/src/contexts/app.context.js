import { createContext } from 'react';

import useAccount from '../hooks/useAccount';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import usePlayers from '../hooks/usePlayers';
import useTeams from '../hooks/useTeams';
import useSystems from '../hooks/useSystems';
import useFormations from '../hooks/useFormations';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const accountState = useAccount();
  const firebaseAuthState = useFirebaseAuth(accountState.account);
  const playerState = usePlayers(accountState.account);
  const teamState = useTeams(accountState.account);
  const systemState = useSystems();
  const formationState = useFormations();

  return (
    <AppContext.Provider
      value={{
        accountState,
        firebaseAuthState,
        playerState,
        teamState,
        systemState,
        formationState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
