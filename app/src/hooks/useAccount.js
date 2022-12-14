import { useState, useEffect, useCallback } from 'react';
import web3 from 'web3';
import { ethers } from 'ethers';
import { httpsCallable } from 'firebase/functions';

import environments from '../utils/environments';
import { functions } from '../configs/firebase.config';
import Token from '../abis/TopSevenPlayer.json';

const { NETWORK_ID: networkId, TOKEN_CONTRACT_ADDRESS: tokenContractAddress } =
  environments;

const useAccount = () => {
  const [account, setAccount] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [tokenMintedIds, setTokenMintedIds] = useState([]);

  const getEthereum = useCallback(() => {
    const { ethereum } = window;

    if (!ethereum) {
      window.open('https://metamask.io/download/');
    }

    return ethereum;
  }, []);

  const getContract = useCallback(() => {
    const ethereum = getEthereum();
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      const tokenContract = new ethers.Contract(
        tokenContractAddress,
        Token.abi,
        signer
      );

      return tokenContract;
    }
  }, []);

  const connectMetamaskWallet = useCallback(async () => {
    const ethereum = getEthereum();
    if (!ethereum) return;

    setIsAuthenticating(true);

    try {
      if (ethereum.networkVersion !== networkId) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: web3.utils.toHex(networkId) }],
        });
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (!accounts.length) throw new Error('No authorized account found');
      setAccount(accounts[0].toLowerCase());
    } catch (err) {
      console.error(err);
      if (err.message.includes('rejected')) return;

      // show error
    }

    setIsAuthenticating(false);
  }, [getEthereum]);

  const checkNetwork = useCallback(async () => {
    const ethereum = getEthereum();
    if (!ethereum) return;

    if (ethereum.networkVersion !== networkId) {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(networkId) }],
      });
    }
  }, []);

  const getMintedIds = useCallback(async () => {
    try {
      const contract = getContract();
      const result = await contract.getMintedIds();
      const mintedIds = result.map((item) => item.toString());
      setTokenMintedIds(mintedIds);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const mintNFT = useCallback(
    async (tokenId, price) => {
      if (!account) return;

      setIsMinting(true);
      try {
        const contract = getContract();
        if (contract) {
          const isFreeMint = await contract.IS_FREE_MINT();
          const value = isFreeMint ? '0' : `${price}`;
          const transaction = await contract.safeMint(account, tokenId, {
            value,
          });
          const result = await transaction.wait();
          if (result?.status === 1) {
            const updateOwner = httpsCallable(functions, 'updateOwner');
            await updateOwner({ playerId: tokenId });
            await getMintedIds();
          }
        }
      } catch (err) {
        console.error(err);
      }
      setIsMinting(false);
    },
    [account, getMintedIds]
  );

  const init = useCallback(async () => {
    const ethereum = getEthereum();
    if (!ethereum) {
      setIsInitialized(true);
      return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    try {
      const address = await signer.getAddress();
      if (address) {
        await checkNetwork();
        setAccount(address.toLowerCase());
      }
    } catch (err) {
      console.error(err);
    }

    setIsInitialized(true);

    ethereum.on('accountsChanged', (accounts) => {
      setAccount(accounts[0] ? accounts[0].toLowerCase() : null);
    });

    ethereum.on('chainChanged', (networkId) => {
      console.log({ networkId });
    });
  }, []);

  const logout = useCallback(() => {
    setAccount(null);
  }, []);

  useEffect(() => {
    init();
    getMintedIds();
  }, []);

  return {
    isInitialized,
    isAuthenticating,
    account,
    tokenMintedIds,
    isMinting,
    connectMetamaskWallet,
    logout,
    getMintedIds,
    mintNFT,
  };
};

export default useAccount;
