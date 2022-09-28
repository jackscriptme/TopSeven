import { useState, useEffect, useRef, useCallback } from 'react';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { query, doc, onSnapshot } from 'firebase/firestore';

import firebaseApp, { firestore } from '../configs/firebase.config';
import { getCustomToken } from '../services/auth.service';

const useFirebaseAuth = (address) => {
  const auth = getAuth(firebaseApp);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const timeout = useRef(null);

  const logout = useCallback(async () => {
    if (auth.currentUser) {
      await auth.signOut();
    }
  }, []);

  const switchAuth = useCallback(async () => {
    if (!isInitialized) return;

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    if (!address) {
      timeout.current = setTimeout(logout, 500);
    }

    if (!!currentUser) {
      if (currentUser.uid === address) return;

      await logout();
    }

    const customToken = await getCustomToken(address);
    await signInWithCustomToken(auth, customToken);
  }, [isInitialized, address, currentUser]);

  useEffect(() => {
    const unscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsInitialized(true);
    });

    return unscribe;
  }, []);

  useEffect(() => {
    switchAuth();
  }, [switchAuth]);

  useEffect(() => {
    let unsubscribe;
    if (currentUser) {
      unsubscribe = onSnapshot(
        doc(firestore, 'users', currentUser.uid),
        async (document) => {
          setProfile(
            document.exists()
              ? {
                  id: document.id,
                  ...document.data(),
                }
              : null
          );
        }
      );
    } else {
      setProfile(null);
    }

    return () => unsubscribe && unsubscribe();
  }, [currentUser]);

  return { currentUser, profile, isInitialized };
};

export default useFirebaseAuth;
