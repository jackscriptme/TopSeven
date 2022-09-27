import { httpsCallable } from 'firebase/functions';
import { ethers } from 'ethers';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

import firebaseApp, { functions } from '../configs/firebase.config';

export const getSignedMessage = async (address) => {
  const get = httpsCallable(functions, 'signMessage');
  const res = await get({ address });
  return res.data;
};

export const getCustomToken = async (address) => {
  const { ethereum } = window;
  if (!ethereum) return;

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  const signedMessage = await getSignedMessage(address);

  const signature = await signer.signMessage(signedMessage);

  const get = httpsCallable(functions, 'getCustomToken');
  const res = await get({ address, signature });

  return res.data;
};

export const logout = async () => {
  const auth = getAuth(firebaseApp);
  if (auth.currentUser) {
    await auth.signOut();
  }
};

export const login = async (address) => {
  if (!address) {
    await logout();
    return;
  }

  const customToken = await getCustomToken(address);

  const auth = getAuth(firebaseApp);
  if (auth.currentUser) {
    await auth.signOut();
  }

  await signInWithCustomToken(auth, customToken);
};
